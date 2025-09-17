import {
  Address,
  DeliveryMethod,
  OrderStatus,
  PaymentType,
  Prisma,
  User,
} from "@prisma/client";
import httpStatus from "http-status";

import { CONFIG } from "../../(helpers)/config";
import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import { dateChecker } from "../../(helpers)/utils/date-checker";
import filterAdder from "../../(helpers)/utils/filter-adder";
import { orderIdGenerator } from "../../(helpers)/utils/helper";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";
import { AddressPayload } from "../address/address.interface";
import { ApplyCouponResponse } from "../coupon/coupon.interface";
import { CouponServices } from "../coupon/coupon.service";

import {
  OrderItem,
  OrderPayloadForGuestUser,
  OrderPayloadForRegisteredUser,
  UpdateOrderByAdminPayload,
  UpdateOrderByCustomerPayload,
} from "./order.interface";
import {
  HOME_DELIVERY_CHARGE,
  orderQueryValidationConfig,
  orderSearchableFields,
  orderSearchableFieldsByAddress,
  orderSelectedFields,
  pickAllowedTransitions,
  refundCalculator,
} from "./order.utils";

// ------------------------------------- PLACE ORDER (USER) ------------------------------------
const placeOrderForRegisteredUser = async (
  user: User,
  data: OrderPayloadForRegisteredUser
) => {
  const {
    address,
    address_id,
    coupon_code,
    delivery_method,
    payment_type,
    comment,
  } = data;

  const { cart, ...userInfo } = await prisma.user.findUniqueOrThrow({
    where: {
      id: user?.id,
    },
    include: {
      cart: {
        include: {
          cart_items: {
            select: {
              product: {
                select: {
                  id: true,
                  price: true,
                },
              },
              quantity: true,
            },
          },
        },
      },
      _count: {
        select: {
          orders: true,
        },
      },
    },
  });

  if (!cart || (cart && cart.cart_items.length === 0)) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "No product found to create order"
    );
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: cart.cart_items.map((item) => item.product.id),
      },
    },
  });

  if (products.every((product) => product.stock === 0)) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "Products are out of stock to create order"
    );
  }

  const orderItems = cart.cart_items.map((item) => ({
    product_id: item.product.id,
    quantity: item.quantity,
    price: item.product.price,
  }));

  const subAmount = orderItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = Math.round((subAmount * CONFIG.tax) / 100);

  let discountAmount = 0;
  let coupon: ApplyCouponResponse | null = null;

  const savedAddress = await checkAddressInOrderFlow(address_id, address);

  if (coupon_code) {
    coupon = await CouponServices.applyCoupon({
      code: coupon_code,
      email: savedAddress?.email || user?.email,
      order_amount: subAmount,
      product_amount: orderItems.length,
      user: {
        id: userInfo.id,
        _count: userInfo._count,
      },
    });
    discountAmount = coupon.discount_amount;
  }

  const deliveryCharge =
    delivery_method === DeliveryMethod.STORE_PICKUP ? 0 : HOME_DELIVERY_CHARGE;
  const totalAmount = subAmount - discountAmount + deliveryCharge + tax;

  const new_order_id = await orderIdGenerator();

  const orderInfo = {
    order_id: new_order_id,
    user_id: user?.id as string,
    payment_type: payment_type || PaymentType.CASH_ON_DELIVERY,
    delivery_method: delivery_method || DeliveryMethod.HOME_DELIVERY,
    delivery_charge: deliveryCharge,
    discount_amount: discountAmount,
    sub_amount: subAmount,
    total_amount: totalAmount,
    tax,
    percentage_of_tax: CONFIG.tax,
    coupon_id: coupon?.id || null,
    comment: comment || null,
  };

  const result = await prisma.$transaction(async (tx) => {
    // let GatewayPageURL;
    // if (payment_type === PaymentType.ONLINE_PAYMENT) {
    //   // Generate payment data
    //   const apiResponse = await SSLPaymentInitiate({
    //     total_amount: orderInfo.payable_amount,
    //     transactionId: orderInfo.order_id,
    //     delivery_method: orderInfo.delivery_method,
    //     products: products,
    //     user: {
    //       name: savedAddress.name,
    //       email: savedAddress.email || "",
    //       address: savedAddress.address,
    //       phone: savedAddress.contact_number,
    //       city: savedAddress.city,
    //       country: savedAddress.country || "Bangladesh",
    //       postal_code: savedAddress.postal_code || "",
    //     },
    //   });

    //   // Initialize SSLCommerz payment

    //   if (apiResponse.status === "FAILED") {
    //     throw new CustomizedError(
    //       httpStatus.BAD_REQUEST,
    //       "Failed to create order"
    //     );
    //   }

    //   GatewayPageURL = apiResponse.GatewayPageURL;
    // }
    let addressId = savedAddress?.id;

    if (!addressId) {
      if (address) {
        const newAddress = await tx.address.create({
          data: {
            ...address,
            user_id: user.id,
          },
        });
        addressId = newAddress.id;
      } else {
        throw new CustomizedError(
          httpStatus.BAD_REQUEST,
          "No address found to create order"
        );
      }
    }

    const order = await tx.order.create({
      data: {
        ...orderInfo,
        address_id: addressId as string,
        order_items: {
          create: orderItems,
        },
      },
      select: {
        ...orderSelectedFields,
      },
    });

    if (order?.coupon?.code) {
      await tx.coupon.update({
        where: {
          code: order.coupon.code,
        },
        data: {
          used_count: {
            increment: 1,
          },
        },
      });
    }

    await tx.orderHistory.create({
      data: {
        user_id: user.id,
        order_id: order.id,
        status: OrderStatus.PENDING,
        remark: "Order has been created",
      },
    });

    await tx.cartItem.deleteMany({
      where: {
        cart_id: cart.id,
      },
    });

    return { order }; //GatewayPageURL
  });

  return result;
};

// ------------------------------------- PLACE ORDER (GUEST) -----------------------------------
const placeOrderForGuestUser = async (data: OrderPayloadForGuestUser) => {
  const {
    address,
    address_id,
    order_items,
    coupon_code,
    delivery_method,
    payment_type,
    comment,
  } = data;

  // Step 1: Extract product IDs from order items
  const productIds = order_items.map((item: OrderItem) => item.product_id);

  // Step 2: Fetch products from the database
  const products = await prisma.product.findMany({
    where: { id: { in: productIds } },
  });

  if (products.length === 0) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "No product found to create order"
    );
  }

  // Step 3: Prepare order items with price and quantity
  const itemsToCreateOrder = products.map((product) => {
    const item = order_items.find((i) => i.product_id === product.id);
    return {
      product_id: product.id,
      quantity: item?.quantity || 1,
      price: product.discount_price || product.price,
    };
  });

  // Step 4: Calculate subtotal and tax
  const subAmount = itemsToCreateOrder.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const tax = Math.round((subAmount * CONFIG.tax) / 100);

  // Step 5: Initialize discount and coupon variables
  let discountAmount = 0;
  let coupon: ApplyCouponResponse | null = null;

  // Step 6: Handle address (update, create or validate)
  const savedAddress: Address | null = await checkAddressInOrderFlow(
    address_id,
    address
  );

  // Step 7: Apply coupon if provided
  if (coupon_code) {
    coupon = await CouponServices.applyCoupon({
      code: coupon_code,
      email: savedAddress?.email || address?.email,
      order_amount: subAmount,
      product_amount: itemsToCreateOrder.length,
    });
    discountAmount = coupon.discount_amount;
  }

  // Step 8: Calculate final amounts
  const deliveryCharge =
    delivery_method === DeliveryMethod.STORE_PICKUP ? 0 : HOME_DELIVERY_CHARGE;
  const totalAmount = subAmount - discountAmount + deliveryCharge + tax;

  // Step 9: Generate unique order ID
  const new_order_id = await orderIdGenerator();

  const orderInfo = {
    order_id: new_order_id,
    payment_type: payment_type || PaymentType.CASH_ON_DELIVERY,
    delivery_method: delivery_method || DeliveryMethod.HOME_DELIVERY,
    delivery_charge: deliveryCharge,
    discount_amount: discountAmount,
    sub_amount: subAmount,
    total_amount: totalAmount,
    tax,
    percentage_of_tax: CONFIG.tax,
    coupon_id: coupon?.id || null,
    comment: comment || null,
  };

  // Step 10: Create order and related records in a transaction
  const result = await prisma.$transaction(async (tx) => {
    // let GatewayPageURL;
    // if (payment_type === PaymentType.ONLINE_PAYMENT) {
    //   // Generate payment data
    //   const apiResponse = await SSLPaymentInitiate({
    //     total_amount: orderInfo.payable_amount,
    //     transactionId: orderInfo.order_id,
    //     delivery_method: orderInfo.delivery_method,
    //     products,
    //     user: {
    //       name: savedAddress.name,
    //       email: savedAddress.email || "",
    //       address: savedAddress.address,
    //       phone: savedAddress.contact_number,
    //       city: savedAddress.city,
    //       country: savedAddress.country || "Bangladesh",
    //       postal_code: savedAddress.postal_code || "",
    //     },
    //   });

    //   // Initialize SSLCommerz payment

    //   if (apiResponse.status === "FAILED") {
    //     throw new CustomizedError(
    //       httpStatus.BAD_REQUEST,
    //       "Failed to create order"
    //     );
    //   }

    //   GatewayPageURL = apiResponse.GatewayPageURL;
    // }

    let addressId = savedAddress?.id;

    if (!addressId) {
      if (address) {
        const newAddress = await tx.address.create({
          data: {
            ...address,
          },
        });
        addressId = newAddress.id;
      } else {
        throw new CustomizedError(
          httpStatus.BAD_REQUEST,
          "No address found to create order"
        );
      }
    }

    // Step 10.1: Create order with items
    const order = await tx.order.create({
      data: {
        ...orderInfo,
        address_id: addressId,
        order_items: { create: itemsToCreateOrder },
      },
      select: { ...orderSelectedFields },
    });

    // Step 10.2: Increment coupon usage count if applied
    if (order?.coupon?.code) {
      await tx.coupon.update({
        where: { code: order.coupon.code },
        data: { used_count: { increment: 1 } },
      });
    }

    // Step 10.3: Record order history
    await tx.orderHistory.create({
      data: {
        order_id: order.id,
        status: OrderStatus.PENDING,
        remark: "Order has been created",
      },
    });

    return { order }; // GatewayPageURL
  });

  return result;
};

// ------------------------------------- GET ALL ORDERS ----------------------------------------
const getOrders = async (query: Record<string, any>) => {
  const {
    search_term,
    page,
    limit,
    sort_by,
    sort_order,
    min_order_amount,
    max_order_amount,
    from_date,
    to_date,
    ...remainingQuery
  } = query;

  if (sort_by) queryValidator(orderQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(orderQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.OrderWhereInput[] = [];

  if (search_term) {
    andConditions.push({
      OR: [
        ...orderSearchableFields.map((field) => ({
          [field]: {
            contains: search_term,
            mode: "insensitive",
          },
        })),
        {
          address: {
            OR: orderSearchableFieldsByAddress.map((field) => ({
              [field]: {
                contains: search_term,
                mode: "insensitive",
              },
            })),
          },
        },
        {
          order_items: {
            some: {
              product: {
                name: {
                  contains: search_term,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        {
          coupon: {
            code: {
              contains: search_term,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  if (Object.keys(remainingQuery).length) {
    for (const [key, value] of Object.entries(remainingQuery)) {
      queryValidator(orderQueryValidationConfig, key, value);
      andConditions.push({
        [key]: value === "true" ? true : value === "false" ? false : value,
      });
    }
  }

  filterAdder(andConditions, "total_amount", "gte", Number(min_order_amount));
  filterAdder(andConditions, "total_amount", "lte", Number(max_order_amount));

  if (from_date) {
    const date = dateChecker(from_date, "from_date");
    andConditions.push({
      created_at: {
        gte: date,
      },
    });
  }

  if (to_date) {
    const date = dateChecker(to_date, "to_date");
    andConditions.push({
      created_at: {
        lte: date,
      },
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total, count_by_order_status] = await Promise.all([
    prisma.order.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      select: {
        ...orderSelectedFields,
      },
    }),
    prisma.order.count({ where: whereConditions }),
    prisma.order.groupBy({
      by: ["order_status"],
      _count: {
        _all: true,
      },
    }),
  ]);

  const formattedCount = count_by_order_status.reduce(
    (acc: Record<string, number>, item) => {
      const statusKey = item.order_status.toLowerCase();
      acc[statusKey] = item._count._all;
      return acc;
    },
    {}
  );

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
      ...formattedCount,
    },
    data: result,
  };
};

// ------------------------------------- GET ORDER BY ORDER ID ---------------------------------
const getOrder = async (order_id: string, user: User) => {
  const result = await prisma.order.findUniqueOrThrow({
    where: {
      order_id: order_id,
    },
    select: {
      ...orderSelectedFields,
      user_id: true,
      refund: {
        select: {
          penalty_charge: true,
          reason: true,
          refund_amount: true,
          refunded_at: true,
        },
      },
      payment: {
        select: {
          id: true,
          amount: true,
          gateway: true,
          status: true,
          paid_at: true,
          transaction_id: true,
        },
      },
      history: {
        select: {
          id: true,
          status: true,
          remark: true,
          created_at: true,
          created_by: {
            select: {
              first_name: true,
              last_name: true,
              email: true,
              contact_number: true,
              avatar: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      },
      shipped_info: {
        select: {
          courier: {
            select: {
              name: true,
            },
          },
          tracking_id: true,
          created_at: true,
        },
      },
    },
  });

  if (!["SUPER_ADMIN", "ADMIN"].includes(user.role)) {
    if (result.user_id !== user.id) {
      throw new CustomizedError(httpStatus.FORBIDDEN, "Forbidden");
    }
  }

  return result;
};

const myOrder = async (user: User | undefined, query: Record<string, any>) => {
  const {
    searchTerm,
    page,
    limit,
    sort_by,
    sort_order,
    min_order_amount,
    max_order_amount,
    ...remainingQuery
  } = query;

  if (sort_by) queryValidator(orderQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(orderQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.OrderWhereInput[] = [{ user_id: user?.id }];

  if (searchTerm) {
    andConditions.push({
      OR: [
        ...orderSearchableFields.map((field) => ({
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        })),
        {
          address: {
            OR: orderSearchableFieldsByAddress.map((field) => ({
              [field]: {
                contains: searchTerm,
                mode: "insensitive",
              },
            })),
          },
        },
        {
          order_items: {
            some: {
              product: {
                name: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        {
          coupon: {
            code: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    });
  }

  if (Object.keys(remainingQuery).length) {
    for (const [key, value] of Object.entries(remainingQuery)) {
      queryValidator(orderQueryValidationConfig, key, value);
      andConditions.push({
        [key]: value === "true" ? true : value === "false" ? false : value,
      });
    }
  }

  filterAdder(andConditions, "total_amount", "gte", Number(min_order_amount));
  filterAdder(andConditions, "total_amount", "lte", Number(max_order_amount));

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.order.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
      select: {
        ...orderSelectedFields,
        history: {
          select: {
            id: true,
            order_id: true,
            status: true,
            remark: true,
            created_at: true,
          },
        },
      },
    }),
    prisma.order.count({ where: whereConditions }),
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

const updateOrderByAdmin = async (
  id: string,
  payload: UpdateOrderByAdminPayload,
  user: User
) => {
  const { order_history, shipped_info, refund_info, ...rest } = payload;

  const order = await prisma.order.findUniqueOrThrow({
    where: {
      id,
    },
    select: {
      order_status: true,
      payment_status: true,
      sub_amount: true,
      delivery_charge: true,
      payment: true,
    },
  });

  // Check if the status transition is valid
  const currentOrderStatus = order.order_status;
  const newOrderStatus = payload.order_status;
  if (
    newOrderStatus &&
    !pickAllowedTransitions(currentOrderStatus, order.payment_status).includes(
      newOrderStatus
    )
  ) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      `Invalid status transition from ${currentOrderStatus} to ${newOrderStatus}`
    );
  }

  // Check payment status to refund an order
  if (
    payload.order_status &&
    payload.order_status === "REFUNDED" &&
    order.payment?.status !== "PAID"
  ) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      `Cannot refund ${order.payment?.status} payment`
    );
  }

  // Check delivery info when shipped the order
  if (
    payload.order_status &&
    payload.order_status === "SHIPPED" &&
    !shipped_info
  ) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      `Delivery information is required`
    );
  }

  // Check payment status to deliver an order
  if (
    newOrderStatus === "DELIVERED" &&
    order.payment_status === "DUE" &&
    payload.payment_status !== "PAID"
  ) {
    throw new CustomizedError(httpStatus.BAD_REQUEST, `Pay the payment`);
  }

  // Check payment status update after order is delivered
  if (
    (currentOrderStatus === "DELIVERED" || newOrderStatus === "DELIVERED") &&
    payload.payment_status === "DUE"
  ) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      `Cannot transition from PAID to DUE after order is delivered`
    );
  }

  if (order.payment_status === "PAID" && payload.payment_type) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      `Cannot update payment method after the payment is completed`
    );
  }

  const result = await prisma.$transaction(async (tx) => {
    if (payload.order_status) {
      await tx.orderHistory.upsert({
        where: {
          order_id_status: {
            order_id: id,
            status: payload.order_status,
          },
        },
        create: {
          user_id: user.id,
          order_id: id,
          status: payload.order_status,
          remark: order_history?.remark || null,
        },
        update: {
          remark: order_history?.remark || null,
        },
      });
    }
    if (payload.order_status === "SHIPPED" && shipped_info) {
      await prisma.shippedInfo.create({
        data: {
          order_id: id,
          ...shipped_info,
        },
      });
    }

    if (
      payload.order_status === "REFUNDED" &&
      order.payment?.status === "PAID" &&
      order.payment?.amount > 0 &&
      refund_info
    ) {
      const refundInformation = {
        order_id: id,
        paid_amount: order.payment.amount,
        refund_amount: refundCalculator(order, refund_info.penalty_charge),
        penalty_charge: refund_info.penalty_charge,
        reason: order_history?.remark || null,
      };
      await prisma.refund.create({
        data: refundInformation,
      });
      rest.payment_status = "REFUNDED";
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id,
      },
      data: rest,
    });

    return updatedOrder;
  });

  return result;
};

const updateOrderByCustomer = async (
  user: User,
  id: string,
  payload: UpdateOrderByCustomerPayload
) => {
  const { address, address_id, ...remainingPayload } = payload;

  const order = await prisma.order.findUniqueOrThrow({
    where: {
      user_id: user?.id,
      id,
    },
  });

  if (
    (order.order_status === "DELIVERED" || order.payment_status === "PAID") &&
    payload.payment_type
  ) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      `Cannot update payment method after the payment is completed`
    );
  }

  if (
    (order.order_status === "SHIPPED" || order.order_status === "DELIVERED") &&
    payload.delivery_method
  ) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      `Cannot update delivery method after the order is shipped or delivered`
    );
  }

  if (
    (order.order_status === "SHIPPED" || order.order_status === "DELIVERED") &&
    address &&
    Object.values(address).length
  ) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      `Cannot update address after the order is shipped or delivered`
    );
  }

  const savedAddress = await checkAddressInOrderFlow(address_id, address);

  const result = await prisma.order.update({
    where: {
      user_id: user?.id,
      id,
    },
    data: {
      ...remainingPayload,
      address_id: savedAddress?.id,
    },
    include: {
      address: true,
    },
  });

  return result;
};

const deleteOrders = async ({ ids }: { ids: string[] }) => {
  await prisma.order.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return null;
};

export const checkAddressInOrderFlow = async (
  address_id?: string,
  address?: AddressPayload
) => {
  let savedAddress: Address | null = null;

  if (address_id) {
    // Step 1: Try to fetch existing address
    savedAddress = await prisma.address.findUnique({
      where: { id: address_id },
    });
    if (!savedAddress)
      throw new CustomizedError(
        httpStatus.BAD_REQUEST,
        "No address found to create order"
      );

    // Step 2: Update if provided address differs
    if (address) {
      const isEqual = Object.keys(address).every(
        (key) =>
          savedAddress![key as keyof typeof address] ===
          address[key as keyof typeof savedAddress]
      );
      if (!isEqual) {
        savedAddress = await prisma.address.update({
          where: { id: address_id },
          data: address,
        });
      }
    }
  }

  return savedAddress;
};

export const OrderServices = {
  placeOrderForGuestUser,
  placeOrderForRegisteredUser,
  getOrders,
  myOrder,
  updateOrderByAdmin,
  updateOrderByCustomer,
  deleteOrders,
  getOrder,
};
