import { z } from "zod";

export const signupSchema = z
  .object({
    first_name: z.string({ error: "First Name is required" }).min(1, "First Name is required"),
    last_name: z.string().optional(),
    email: z.email("Invalid email address"),
    contact_number: z
      .string()
      .optional()
      .refine((val) => !val || val.length === 11, {
        message: "Contact number must be exactly 11 characters",
      }),
    password: z.string({ error: "Password is required" }).min(6, "Password must be at least 6 characters"),
    confirm_password: z.string({ error: "Confirm Password is required" }).min(6, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type SignupSchemaType = z.infer<typeof signupSchema>;
