import { AttributeType } from "@prisma/client";
import z from "zod";

const createAttribute = z.object({
  body: z
    .object({
      name: z
        .string({ error: "Attribute name should be a text" })
        .min(1, "Attribute name is required"),
      type: z.enum(
        Object.values(AttributeType),
        `Invalid attribute type. Expected: ${Object.values(AttributeType).join(
          " or "
        )}`
      ),
      category_id: z
        .uuid({
          error: "Category id should be a valid uuid",
        })
        .optional(),
      attribute_values: z.array(
        z
          .object({
            title: z.string({
              error: "Attribute value title should be a text",
            }),
            position: z.number({
              error: "Attribute value position should be a number",
            }),
          })
          .strict(),
        "Invalid attribute values, Expected: array of title and position"
      ),
    })
    .strict(),
});

export const AttributeSchemas = {
  createAttribute,
};
