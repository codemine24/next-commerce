import { z } from "zod";

const deleteRecordsValidationSchema = z.object({
  body: z
    .object({
      ids: z
        .array(
          z.uuid({
            error: "ID should be a valid uuid",
          })
        )
        .min(1, "At least one ID is required"),
    })
    .strict(),
});

export const commonSchemas = {
  deleteRecordsValidationSchema,
};
