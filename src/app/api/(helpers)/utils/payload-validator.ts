import { ZodError, ZodObject } from "zod";
import errorHandler from "../error/error-handler";

const payloadValidator = async <T>(schema: ZodObject, data: T) => {
  try {
    await schema.parseAsync({
      body: data,
    });
  } catch (error) {
    throw errorHandler(error as ZodError);
  }
};

export default payloadValidator;
