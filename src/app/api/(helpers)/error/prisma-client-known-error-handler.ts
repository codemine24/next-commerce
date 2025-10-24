import { Prisma } from "@prisma/client";
import httpStatus from "http-status";

import { ErrorSources, GenericErrorResponse } from "../shared/response";

const prismaClientKnownErrorHandler = (
  err: Prisma.PrismaClientKnownRequestError
): GenericErrorResponse => {
  let statusCode = 400;
  let message = "Database error!";
  let errorSources: ErrorSources[] = [];

  if (err.code === "P2002" && err.meta?.target) {
    statusCode = httpStatus.CONFLICT;
    message = "Duplicate value exists.";
    errorSources = (err.meta.target as string[]).map((field: string) => ({
      path: field,
      message: `The ${field} is already exists in the ${err.meta?.modelName}. Please try another ${field}`,
    }));
    if (errorSources.length)
      message = errorSources.map((item) => item.message).join(" | ");
  } else if (err.code === "P2025") {
    statusCode = httpStatus.NOT_FOUND;
    message = (err.meta?.cause as string) || "Data not found";
    errorSources = [
      {
        path: err.meta?.modelName as string,
        message: (err.meta?.cause as string) || err.message,
      },
    ];
  } else if (err.code === "P2003") {
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default prismaClientKnownErrorHandler;
