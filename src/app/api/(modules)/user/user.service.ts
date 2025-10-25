import httpStatus from "http-status";

import CustomizedError from "@/app/api/(helpers)/error/customized-error";

import { User } from "./user.interface";
import UserModel from "./user.model";

// ------------------------------------ GET PROFILE ----------------------------------------
const getProfile = async (user: User) => {
  const result = await UserModel.findById(user._id);

  if (!result) {
    throw new CustomizedError(httpStatus.NOT_FOUND, "User not found");
  }

  return result;
};

export const UserServices = {
  getProfile,
};
