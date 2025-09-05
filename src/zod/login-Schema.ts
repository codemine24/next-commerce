import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("E-Mail is required")
    .refine(
      (val) =>
        /^(?!\.)(?!.*\.\.)([a-z0-9_'+\-\.]*)[a-z0-9_+-]@([a-z0-9][a-z0-9\-]*\.)+[a-z]{2,}$/i.test(
          val
        ),
      {
        message: "Invalid email address",
      }
    ),

  password: z
    .string()
    .nonempty("Password is required") // required check
    .min(6, "Password must be at least 6 characters")
    .max(32, "Password must be at most 32 characters"),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
