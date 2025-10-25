import bcrypt from "bcrypt";
import httpStatus from "http-status";
import { cookies } from "next/headers";

import { CONFIG } from "@/app/api/(helpers)/config";
import CustomizedError from "@/app/api/(helpers)/error/customized-error";

import { generateToken } from "../../(helpers)/utils/jwt-helpers";
import UserModel from "../user/user.model";

import { CredentialPayload, UserPayload } from "./auth.interface";

// ------------------------------------ REGISTER NEW USER -----------------------------------
const registerUser = async (data: UserPayload) => {
  const hashedPassword = await bcrypt.hash(
    data.password,
    Number(CONFIG.salt_rounds)
  );

  const result = await UserModel.create({
    ...data,
    password: hashedPassword,
  });

  return result;
};

// ------------------------------------ LOG IN USER -----------------------------------------
const login = async (credential: CredentialPayload) => {
  // Step 1: Destructure input credentials and get cookie store
  const { email, password } = credential;
  const cookieStore = await cookies();

  // Step 2: Find the user by email and validate active & not deleted user existence
  const user = await UserModel.findOne({
    email,
    status: "ACTIVE",
    is_deleted: false,
  }).select("+password");

  if (!user || !user.password) {
    throw new CustomizedError(httpStatus.NOT_FOUND, "User not found");
  }

  // Step 3: Compare given password with stored hash
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new CustomizedError(
      httpStatus.FORBIDDEN,
      "Email or password is invalid"
    );
  }

  // Step 4: Prepare JWT payload with necessary user info
  const jwtPayload = {
    id: user.id.toString(),
    first_name: user.first_name,
    last_name: user.last_name,
    avatar: user.avatar,
    contact_number: user.contact_number,
    email: user.email,
    role: user.role,
  };

  // Step 5: Generate access and refresh tokens
  const accessToken = generateToken(
    jwtPayload,
    CONFIG.jwt_access_secret,
    CONFIG.jwt_access_expiresIn
  );
  const refreshToken = generateToken(
    jwtPayload,
    CONFIG.jwt_refresh_secret,
    CONFIG.jwt_refresh_expiresIn
  );

  // Step 6: Set JWT tokens as cookies
  const setCookie = (name: string, value: string, maxAge: number | string) => {
    cookieStore.set(name, value, {
      httpOnly: false, // TODO: change to true for production
      secure: CONFIG.node_env === "production",
      sameSite: "strict",
      maxAge: Number(maxAge),
    });
  };

  setCookie("refresh_token", refreshToken, CONFIG.jwt_refresh_expiresIn);
  setCookie("access_token", accessToken, CONFIG.jwt_access_expiresIn);

  // Step 7: Convert Mongoose document to plain object
  const userObj = user.toObject ? user.toObject() : { ...user };

  // Step 8: Return sanitized user data and tokens
  return {
    user: {
      id: userObj._id,
      name: `${userObj.first_name} ${userObj.last_name || ""}`.trim(),
      email: userObj.email,
      contact_number: userObj.contact_number,
      avatar: userObj.avatar,
      role: userObj.role,
      status: userObj.status,
    },
    access_token: accessToken,
    refresh_token: refreshToken,
  };
};

export const AuthServices = {
  registerUser,
  login,
};
