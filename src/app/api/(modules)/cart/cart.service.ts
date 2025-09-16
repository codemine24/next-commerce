import { User } from "@prisma/client";

import { prisma } from "../../(helpers)/shared/prisma";

import { AddToCartPayload } from "./cart.interface";

// ------------------------------------ ADD TO CART ------------------------------------
const addToCart = async (user: User, payload: AddToCartPayload[]) => {
  const result = await prisma.$transaction(async (tx) => {
    // Ensure the user has a cart
    const cart = await tx.cart.upsert({
      where: {
        user_id: user.id,
      },
      create: {
        user_id: user.id,
      },
      update: {},
    });

    // Loop through each item in payload
    for (const item of payload) {
      const product = await tx.product.findUniqueOrThrow({
        where: {
          id: item.product_id,
          is_deleted: false,
        },
        select: {
          id: true,
          price: true,
          discount_price: true,
        },
      });

      const quantity = item.quantity || 1;

      await tx.cartItem.upsert({
        where: {
          cart_id_product_id: {
            cart_id: cart.id,
            product_id: product.id,
          },
        },
        create: {
          cart_id: cart.id,
          product_id: product.id,
          quantity: quantity,
        },
        update: {
          quantity: {
            increment: quantity,
          },
        },
      });
    }

    return { message: "Products added to cart successfully" };
  });

  return result;
};

// ------------------------------------ GET CART ---------------------------------------
const getCart = async (user: User) => {
  const cart = await prisma.cart.findUniqueOrThrow({
    where: {
      user_id: user.id,
    },
    include: {
      cart_items: {
        include: {
          product: true,
        },
      },
    },
  });

  const cartItemsWithTotal = cart?.cart_items.map((item) => ({
    id: item.id,
    product: {
      id: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      thumbnail: item.product.thumbnail,
      price: item.product.price,
    },
    quantity: item.quantity,
    billing_price: item.product.discount_price || item.product.price,
    total: item.product.discount_price
      ? item.quantity * item.product.discount_price
      : item.quantity * item.product.price,
  }));

  const cartTotal = cartItemsWithTotal.reduce(
    (acc: number, item) => acc + item.total,
    0
  );

  return {
    ...cart,
    cart_total: cartTotal,
    cart_items: cartItemsWithTotal,
  };
};

// ------------------------------------ UPDATE CART ITEM -------------------------------
const updateCartItem = async (id: string, payload: { quantity: number }) => {
  if (payload.quantity === undefined || payload.quantity <= 0) {
    await prisma.cartItem.delete({
      where: {
        id,
      },
    });
    return null;
  }

  const cartItem = await prisma.cartItem.update({
    where: {
      id,
    },
    data: {
      quantity: payload.quantity,
    },
  });

  return cartItem;
};

// ------------------------------------ REMOVE ITEM FROM CART --------------------------
const removeItemFromCart = async (user: User, cartItemId: string) => {
  await prisma.cartItem.delete({
    where: {
      id: cartItemId,
      cart: {
        user_id: user.id,
      },
    },
  });

  return null;
};

export const CartServices = {
  addToCart,
  getCart,
  removeItemFromCart,
  updateCartItem,
};
