import { CONFIG } from "@/app/api/(helpers)/config";
import { prisma } from "@/app/api/(helpers)/shared/prisma";
import bcrypt from "bcrypt";
import { UserPayload } from "./interface";

const registerUser = async (data: UserPayload) => {
  const hashedPassword = await bcrypt.hash(
    data.password,
    Number(CONFIG.salt_rounds)
  );

  const result = await prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });

  return result;
};

export const AuthServices = {
  registerUser,
};
