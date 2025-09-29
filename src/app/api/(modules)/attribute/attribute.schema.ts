import { AttributeStatus, AttributeType } from "@prisma/client";
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
            position: z
              .number({
                error: "Attribute value position should be a number",
              })
              .optional(),
          })
          .strict(),
        "Invalid attribute values, Expected: array of title and position"
      ),
    })
    .strict(),
});

const updateAttribute = z.object({
  body: z
    .object({
      name: z
        .string({ error: "Attribute name should be a text" })
        .min(1, "Attribute name is required")
        .optional(),
      type: z
        .enum(
          Object.values(AttributeType),
          `Invalid attribute type. Expected: ${Object.values(
            AttributeType
          ).join(" or ")}`
        )
        .optional(),
      status: z
        .enum(
          Object.values(AttributeStatus),
          `Invalid attribute status. Expected: ${Object.values(
            AttributeStatus
          ).join(" or ")}`
        )
        .optional(),
      category_id: z
        .uuid({
          error: "Category id should be a valid uuid",
        })
        .optional(),
      attribute_values: z
        .array(
          z
            .object({
              title: z.string({
                error: "Attribute value title should be a text",
              }),
              position: z
                .number({
                  error: "Attribute value position should be a number",
                })
                .optional(),
            })
            .strict(),
          "Invalid attribute values, Expected: array of title and position"
        )
        .optional(),
    })
    .strict(),
});

export const AttributeSchemas = {
  createAttribute,
  updateAttribute,
};
