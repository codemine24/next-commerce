import httpStatus from "http-status";

import CustomizedError from "@/app/api/(helpers)/error/customized-error";

import UserModel from "../auth/auth.model";

// ------------------------------------ GET PROFILE ----------------------------------------
const getProfile = async (user: any) => {
  const result = await UserModel.findById(user.id).lean();

  if (!result) {
    throw new CustomizedError(httpStatus.NOT_FOUND, "User not found");
  }

  return result;
};

export const UserServices = {
  getProfile,
};
