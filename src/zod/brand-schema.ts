import { z } from "zod";

export const brandSchema = z
    .object({
        name: z
            .string({ error: "Brand name is required" }),
        code: z
            .string({ error: "Brand code is required" })
            .optional(),
        description: z
            .string({ error: "Brand description is required" })
            .optional(),
        icon: z.instanceof(File).optional(),
    })

export type BrandSchema = z.infer<typeof brandSchema>;