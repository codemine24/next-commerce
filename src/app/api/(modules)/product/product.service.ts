import { prisma } from "@/app/api/(helpers)/shared/prisma";
import { ProductPayload } from "./product.interface";

const addProduct = async (payload: ProductPayload) => {
  const productCode = "product-" + Math.random().toString(36).substring(2, 9);
  const product = await prisma.product.create({
    data: {
      ...payload,
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

export const ProductServices = {
  addProduct,
  getProducts,
};
