import z from "zod";

export const passwordChangeSchema = z
    .object({
        old_password: z
            .string()
            .min(6, "Current password must be at least 6 characters long"),
        new_password: z
            .string()
            .min(6, "New password must be at least 6 characters long"),
        confirm_password: z
            .string()
            .min(6, "Confirm password must be at least 6 characters long"),
    })
    .refine((data) => data.new_password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"],
    });

export type PasswordChangeFormType = z.infer<typeof passwordChangeSchema>;