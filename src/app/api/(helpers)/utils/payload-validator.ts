import { ZodError, ZodObject } from "zod";

import errorHandler from "../error/error-handler";

const payloadValidator = async <T>(schema: ZodObject, data: T) => {
  try {
    await schema.parseAsync({
      body: data,
    });
  } catch (error) {
    const res = errorHandler(error as ZodError);
    throw res;
  }
};

export default payloadValidator;
