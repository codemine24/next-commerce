export function catchAsync<T extends (...args: unknown[]) => Promise<Response>>(
  fn: T
): (...args: Parameters<T>) => Promise<Response> {
  return async (...args: Parameters<T>) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("Unhandled Error:", error);
      return Response.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 }
      );
    }
  };
}
