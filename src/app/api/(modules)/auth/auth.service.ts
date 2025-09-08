import { CONFIG } from "@/app/api/(helpers)/config";
import { prisma } from "@/app/api/(helpers)/shared/prisma";
import { UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import httpStatus from "http-status";
import CustomizedError from "../../(helpers)/error/customized-error";
import { generateToken } from "../../(helpers)/utils/jwt-helpers";
import { CredentialPayload, UserPayload } from "./auth.interface";
import { USER_SELECTED_FIELDS } from "./auth.utils";

// ------------------------------------ REGISTER NEW USER -----------------------------------
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
    select: {
      ...USER_SELECTED_FIELDS,
    },
  });

  return result;
};

// ------------------------------------ LOG IN USER -----------------------------------------
const login = async (credential: CredentialPayload) => {
  const { email, password } = credential;

  const user = await prisma.user.findFirst({
    where: {
      email,
      status: UserStatus.ACTIVE,
      is_deleted: false,
    },
  });

  if (!user) {
    throw new CustomizedError(httpStatus.NOT_FOUND, "User not found");
  }

  const checkPassword = await bcrypt.compare(password, user.password);
  if (!checkPassword) {
    throw new CustomizedError(
      httpStatus.FORBIDDEN,
      "Email or password is invalid"
    );
  }

  const jwtPayload = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    avatar: user.avatar,
    contact_number: user.contact_number,
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    CONFIG.jwt_access_secret,
    CONFIG.jwt_access_expiresin
  );

  const refreshToken = generateToken(
    jwtPayload,
    CONFIG.jwt_refresh_secret,
    CONFIG.jwt_refresh_expiresin
  );

  return {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    contact_number: user.contact_number,
    role: user.role,
    avatar: user.avatar,
    status: user.status,
    created_at: user.created_at,
    updated_at: user.updated_at,
    access_token: accessToken,
    refreshToken,
  };
};

export const AuthServices = {
  registerUser,
  login,
};
