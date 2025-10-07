import z from "zod";

export const attributeSchema = z.object({
  name: z
    .string({ error: "Attribute name is required" })
    .min(1, "Attribute name is required"),
  type: z
    .string({ error: "Attribute type is required" })
    .min(1, "Attribute type is required"),
  category_id: z
    .string({ error: "Category is required" })
    .min(1, "Category is required"),
  attribute_values: z
    .array(z.string().min(1, "Attribute value is required"))
    .nonempty({ message: "Attribute values are required" }),
});

export type AttributeSchema = z.infer<typeof attributeSchema>;
