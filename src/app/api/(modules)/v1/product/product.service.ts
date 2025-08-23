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

export const ProductServices = {
  addProduct,
};
