import { prisma } from "@/app/api/(helpers)/shared/prisma";
import { slugGenerator } from "../../(helpers)/utils/slug-generator";
import { ProductPayload } from "./product.interface";

const addProduct = async (payload: ProductPayload) => {
  const productCode = "product-" + Math.random().toString(36).substring(2, 9);

  const product = await prisma.product.create({
    data: {
      ...payload,
      slug: slugGenerator(payload.name),
      product_code: productCode,
    },
  });

  return product;
};

const getProducts = async (query: Record<string, any>) => {
  console.log("query..........", query);

  const products = await prisma.product.findMany();
  return products;
};

const getProduct = async (id: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });

  return product;
};

const updateProduct = async (id: string, payload: ProductPayload) => {
  const result = await prisma.product.update({
    where: {
      id,
    },

    data: {
      ...payload,
    },
  });

  return result;
};

const deleteProduct = async (id: string) => {
  const product = await prisma.product.delete({
    where: {
      id,
    },
  });

  return product;
};

export const ProductServices = {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};
