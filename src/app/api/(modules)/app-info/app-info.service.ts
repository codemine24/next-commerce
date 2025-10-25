import httpStatus from "http-status";

import CustomizedError from "../../(helpers)/error/customized-error";
import { connectToDatabase } from "../../(helpers)/utils/mongoose";

import { AppInfoPayload } from "./app-info.interface";
import { AppInfoModel } from "./app-info.model";

// ------------------------------------ SET APP INFO -------------------------------------
const setAppInfo = async (data: AppInfoPayload) => {
  await connectToDatabase();

  const result = await AppInfoModel.create(data);
  return result;
};

// ------------------------------------ GET APP INFO -------------------------------------
const getAppInfo = async (query: Record<string, any>) => {
  await connectToDatabase();

  const { name } = query;

  if (!name) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "Name is required in query"
    );
  }

  const result = await AppInfoModel.findOne({ name });
  return result;
};

// ------------------------------------ UPDATE APP INFO ----------------------------------
const updateAppInfo = async (id: string, data: AppInfoPayload) => {
  await connectToDatabase();

  const result = await AppInfoModel.findByIdAndUpdate(id, data, { new: true });
  if (!result) {
    throw new CustomizedError(httpStatus.NOT_FOUND, "App info not found");
  }

  return result;
};

// ------------------------------------ DELETE APP INFO ----------------------------------
const deleteAppInfo = async (id: string) => {
  await connectToDatabase();

  const deleted = await AppInfoModel.findByIdAndDelete(id);
  if (!deleted) {
    throw new CustomizedError(httpStatus.NOT_FOUND, "App info not found");
  }

  return null;
};

export const AppInfoServices = {
  setAppInfo,
  getAppInfo,
  updateAppInfo,
  deleteAppInfo,
};
