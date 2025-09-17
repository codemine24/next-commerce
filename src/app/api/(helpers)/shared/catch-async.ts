import errorHandler from "../error/error-handler";

import { errorResponse } from "./response";

export function catchAsync<T extends (...args: any[]) => Promise<Response>>(
  handler: T
) {
  return (async (...args: Parameters<T>): Promise<Response> => {
    try {
      return await handler(...args);
    } catch (err) {
      const formattedError = errorHandler(err);
      return errorResponse(formattedError);
    }
  }) as T;
}
