/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import { ZodError } from "zod";
import { ErrorSources } from "../shared/response";
import zodErrorHandler from "./zod-error-handler";

const errorHandler = (error: any) => {
  let statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  let message = error.message || "Something went wrong!";
  let errorSources: ErrorSources[] = [
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
  }

  return {
    statusCode,
    message: message,
    errorSources,
  };
};

export default errorHandler;
