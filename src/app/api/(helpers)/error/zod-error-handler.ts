import { ZodError } from "zod";

import { ErrorSources, GenericErrorResponse } from "../shared/response";

const zodErrorHandler = (err: ZodError): GenericErrorResponse => {
  const errorSources: ErrorSources[] = err.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1] as string,
    message: issue.message,
  }));
  let message = "Validation error!";
  const statusCode = 400;

  if (errorSources?.length) {
    message = errorSources.map((item) => item.message).join(" | ");
  }

  return {
    statusCode,
    message,
    errorSources,
  };
};

export default zodErrorHandler;
