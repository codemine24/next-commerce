import { UserRole, UserStatus } from "@prisma/client";
import z from "zod";

const updateProfile = z.object({
  body: z
    .object({
      avatar: z.instanceof(File).optional(),
      data: z
        .object({
          first_name: z
            .string({ error: "First name should be a text" })
            .min(1, "First name is required")
            .optional(),
          last_name: z
            .string({ error: "Last name should be a text" })
            .optional()
            .nullable(),
          contact_number: z
            .string({ error: "Contact number should be a text" })
            .optional()
            .nullable(),
        })
        .strict(),
    })
    .strict(),
});

const updateUserByAdmin = z.object({
  body: z
    .object({
      contact_number: z
        .string({ error: "Contact number should be a text" })
        .optional()
        .nullable(),
      role: z
        .enum(Object.values(UserRole), {
          error: `Role should be one of ${Object.values(UserRole).join(" | ")}`,
        })
        .optional(),
      status: z
        .enum(Object.values(UserStatus), {
          error: `Status should be one of ${Object.values(UserStatus).join(
            " | "
          )}`,
        })
        .optional(),
      is_deleted: z
        .boolean({ error: "is_deleted should be a boolean" })
        .optional(),
    })
    .strict(),
});

export const UserSchemas = {
  updateProfile,
  updateUserByAdmin,
};
