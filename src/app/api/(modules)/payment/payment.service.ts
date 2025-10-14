import { CONFIG } from "../../(helpers)/config";
import { prisma } from "../../(helpers)/shared/prisma";
import { stripe } from "../../(helpers)/shared/stripe";
import { formatAmountForStripe } from "../../(helpers)/utils/stripe-helper";

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

export const PaymentServices = { createPaymentSession };
