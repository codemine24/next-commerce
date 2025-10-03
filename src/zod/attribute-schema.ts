import { AttributeType } from "@prisma/client";
import z from "zod";

export const attributeSchema = z.object({
  name: z
    .string({ error: "Attribute name is required" })
    .min(1, "Attribute name is required"),
  type: z.enum(Object.values(AttributeType), {
    error: "Attribute type is required",
  }),
  category_id: z
    .string({ error: "Category id is required" })
    .min(1, "Category id is required"),
  attribute_values: z
    .array(z.string().min(1, "Attribute value is required"))
    .nonempty({ message: "Attribute values are required" }),
});

export type AttributeSchema = z.infer<typeof attributeSchema>;
