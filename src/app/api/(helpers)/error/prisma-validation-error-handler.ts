/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from "@prisma/client";
import { ErrorSources, GenericErrorResponse } from "../shared/response";

const prismaValidationErrorHandler = (
  error: Prisma.PrismaClientValidationError
): GenericErrorResponse => {
  const statusCode = 400;
  const message = "Database validation error!";

  const errorSources: ErrorSources[] = [
    {
      path: "Database",
      message: "Perhaps you are missing some required fields",
    },
  ];

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default prismaValidationErrorHandler;
