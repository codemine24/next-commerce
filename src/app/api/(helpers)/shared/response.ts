import httpStatus from "http-status";

export interface ErrorSources {
  path: string | number;
  message: string;
}

export interface GenericErrorResponse {
  statusCode: number;
  message: string;
  errorSources: ErrorSources[];
}

export interface Meta {
  total?: number;
  limit?: number;
  page?: number;
  [key: string]: unknown;
}

export interface SuccessPayload<T> {
  statusCode?: number;
  success?: boolean;
  message?: string;
  meta?: Meta;
  data: T | null | undefined;
}

export const successResponse = <T>(payload: SuccessPayload<T>) => {
  return Response.json(
    {
      success: true,
      message: payload.message || "Success",
      meta: payload.meta,
      data: payload.data,
    },
    { status: payload.statusCode || httpStatus.OK }
  );
};

export interface ErrorPayload {
  statusCode?: number;
  message?: string;
  errorSources: unknown;
}

export const errorResponse = (payload: ErrorPayload) => {
  return Response.json(
    {
      success: false,
      message: payload.message || "Failed",
      errorSources: payload.errorSources,
    },
    { status: payload.statusCode || httpStatus.INTERNAL_SERVER_ERROR }
  );
};
