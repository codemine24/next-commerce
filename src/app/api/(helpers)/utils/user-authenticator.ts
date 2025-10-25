import httpStatus from "http-status";

import { UserStatus } from "@/app/api/(modules)/user/user.constant";
import { UserRole } from "@/app/api/(modules)/user/user.interface";
import UserModel from "@/app/api/(modules)/user/user.model";

import { CONFIG } from "../config";
import CustomizedError from "../error/customized-error";

import { verifyToken } from "./jwt-helpers";

const userAuthenticator = async (req: Request, roles: UserRole[]) => {
  // Step 1: Get token from request header
  let token = req.headers.get("Authorization");
  if (!token) {
    throw new CustomizedError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized"
    );
  }

  // Step 2: Remove "Bearer " prefix if present
  if (token?.startsWith("Bearer ")) {
    token = token.split("Bearer ")[1];
  }

  // Step 3: Verify and decode JWT token
  const verifiedUser = verifyToken(token, CONFIG.jwt_access_secret);

  // Step 4: Check if user exists in database and is active (not deleted, not blocked)
  const user = await UserModel.findOne({
    _id: verifiedUser?.id,
    is_deleted: false,
    status: UserStatus.ACTIVE,
  }).select("+password");

  if (!user || !user.password) {
    throw new CustomizedError(httpStatus.NOT_FOUND, "User not found");
  }

  // Step 5: Check if password was changed after token was issued (invalidate old tokens)
  if (user.password_changed_at && verifiedUser.iat) {
    const passwordChangedTime = Math.floor(
      new Date(user.password_changed_at).getTime() / 1000
    );

    if (passwordChangedTime > verifiedUser.iat) {
      throw new CustomizedError(
        httpStatus.UNAUTHORIZED,
        "Password changed recently"
      );
    }
  }

  // Step 6: Role-based authorization (check if user role is allowed)
  if (roles?.length && !roles.includes(verifiedUser?.role)) {
    throw new CustomizedError(
      httpStatus.UNAUTHORIZED,
      "You are not authorized"
    );
  }

  const userData = user.toObject();
  delete userData.password;

  // Step 7: Return the authenticated user if everything is valid
  return userData;
};

export default userAuthenticator;
