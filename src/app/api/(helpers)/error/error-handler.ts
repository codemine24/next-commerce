import { Prisma } from "@prisma/client";
import httpStatus from "http-status";
import { ZodError } from "zod";

import { ErrorSources } from "../shared/response";

import prismaClientKnownErrorHandler from "./prisma-client-known-error-handler";
import prismaValidationErrorHandler from "./prisma-validation-error-handler";
import zodErrorHandler from "./zod-error-handler";

const errorHandler = (error: any) => {
  let statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = error.message || "Something went wrong!";
  let errorSources: ErrorSources[] = error.errorSources || [
    {
      path: "",
      message: error.message || "",
    },
  ];

  if (error instanceof ZodError) {
    const simplifiedError = zodErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    const simplifiedError = prismaClientKnownErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedError = prismaValidationErrorHandler(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  return {
    statusCode,
    message: message,
    errorSources,
  };
};

export default errorHandler;
