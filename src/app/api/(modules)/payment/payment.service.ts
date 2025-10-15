import { PaymentGateway, PaymentStatus, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { ApiError } from "next/dist/server/api-utils";
import Stripe from "stripe";

import { CONFIG } from "../../(helpers)/config";
import { prisma } from "../../(helpers)/shared/prisma";
import { stripe } from "../../(helpers)/shared/stripe";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";
import { formatAmountForStripe } from "../../(helpers)/utils/stripe-helper";

import { UpdatePaymentInfoPayload } from "./payment.interface";
import {
  paymentQueryValidationConfig,
  paymentSearchableFields,
} from "./payment.utils";

// ------------------------------------- CREATE PAYMENT SESSION -----------------------------------
const createPaymentSession = async (orderID: string) => {
  const order = await prisma.order.findFirst({
    where: {
      id: orderID,
    },
    select: {
      order_items: {
        select: {
          quantity: true,
          price: true,
          product: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  const lineItems = order?.order_items.map((item) => ({
    price_data: {
      currency: CONFIG.currency,
      product_data: {
        name: item.product.name,
      },
      unit_amount: formatAmountForStripe(item.price, CONFIG.currency),
    },
    quantity: item.quantity,
  }));

  const paymentSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "pay",
    payment_method_types: ["card"],
    line_items: lineItems,
    success_url: `http://localhost:3000/payment-success?session_id={CHECKOUT_SESSION_ID}&order_id=${orderID}`,
    cancel_url: `http://localhost:3000/cancel`,
  });

  return paymentSession?.url;
};

// ------------------------------------- UPDATE PAYMENT INFO --------------------------------------
export const updatePaymentInfo = async (payload: UpdatePaymentInfoPayload) => {
  // Step 1: Validate and find the order
  const order = await prisma.order.findFirst({
    where: {
      OR: [{ id: payload.order_id }, { order_id: payload.order_id }],
    },
  });

  if (!order) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order not found");
  }

  // Prevent double payment update
  if (order.payment_status === PaymentStatus.PAID) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment already completed");
  }

  // Step 2: Retrieve Stripe Checkout Session
  const paymentSession = await stripe.checkout.sessions.retrieve(
    payload.payment_session_id,
    { expand: ["payment_intent"] }
  );

  const paymentIntent =
    paymentSession?.payment_intent as Stripe.PaymentIntent | null;

  if (!paymentIntent) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "Invalid payment session or missing payment intent"
    );
  }

  // Step 3: Validate payment status
  const isPaid = paymentSession.payment_status === "paid";
  const isSucceeded = paymentIntent.status === "succeeded";

  if (!isPaid || !isSucceeded) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Payment not successful");
  }

  // Step 4: Build payment info payload
  const paymentInfo = {
    order_id: order.id,
    amount: paymentIntent.amount_received,
    gateway: PaymentGateway.STRIPE,
    status: PaymentStatus.PAID,
    transaction_id: paymentIntent.id,
    paid_at: new Date(),
  };

  // Step 5: Record payment & update order atomically
  const result = await prisma.$transaction(async (tx) => {
    // Create payment record
    const payment = await tx.payment.create({ data: paymentInfo });

    // Update order payment status
    await tx.order.update({
      where: { id: order.id },
      data: { payment_status: PaymentStatus.PAID },
    });

    return payment;
  });

  return result;
};

// ------------------------------------- GET PAYMENT HISTORY --------------------------------------
const getPaymentHistory = async (query: Record<string, any>) => {
  const { search_term, page, limit, sort_by, sort_order, status } = query;

  if (sort_by) queryValidator(paymentQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(paymentQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.PaymentWhereInput[] = [];

  if (status) andConditions.push({ status });

  if (search_term) {
    andConditions.push({
      OR: [
        ...paymentSearchableFields.map((field) => {
          return {
            [field]: {
              contains: search_term,
              mode: "insensitive",
            },
          };
        }),
        {
          order: {
            order_id: {
              contains: search_term,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  const whereConditions = {
    AND: [...andConditions],
  };

  const orderBy: Prisma.BrandOrderByWithRelationInput =
    sortWith === "products"
      ? {
          products: {
            _count: sortSequence,
          },
        }
      : {
          [sortWith]: sortSequence,
        };

  const [result, total] = await Promise.all([
    prisma.payment.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy,
    }),
    await prisma.payment.count({ where: whereConditions }),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

export const PaymentServices = {
  createPaymentSession,
  updatePaymentInfo,
  getPaymentHistory,
};
