import { z } from "zod";

export const NewsletterEmailSchema = z.object({
    email: z.email("Enter a valid email"),
});

export const NewsletterOtpSchema = z.object({
    email: z.email("Enter a valid email"),
    otp: z.number("Enter a valid otp"),
});


export type EmailFormValues = z.infer<typeof NewsletterEmailSchema>;
export type OtpFormValues = z.infer<typeof NewsletterOtpSchema>;

