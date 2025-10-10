import httpStatus from "http-status";

import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";

import { AppInfoPayload } from "./app-info.interface";

// ------------------------------------ SET APP INFO -------------------------------------
const setAppInfo = async (data: AppInfoPayload) => {
  const result = await prisma.appInfo.create({
    data: data,
  });

  return result;
};

// ------------------------------------ GET APP INFO -------------------------------------
const getAppInfo = async (query: Record<string, any>) => {
  const { name } = query;

  if (!name) {
    throw new CustomizedError(
      httpStatus.BAD_REQUEST,
      "Name is required in query"
    );
  }

  const result = await prisma.appInfo.findFirst({
    where: { name },
  });

  return result;
};

// ------------------------------------ UPDATE APP INFO ----------------------------------
const updateAppInfo = async (id: string, data: AppInfoPayload) => {
  const result = await prisma.appInfo.update({
    where: { id },
    data: data,
  });

  return result;
};

// ------------------------------------ DELETE APP INFO ----------------------------------
const deleteAppInfo = async (id: string) => {
  await prisma.appInfo.delete({
    where: { id },
  });

  return null;
};

export const AppInfoServices = {
  setAppInfo,
  getAppInfo,
  updateAppInfo,
  deleteAppInfo,
};
