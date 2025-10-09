import z from "zod";

const createOtpForNewsletter = z.object({
  body: z
    .object({
      email: z.email({ error: "Enter a valid email" }),
    })
    .strict(),
});

const subscribeInNewsletter = z.object({
  body: z
    .object({
      email: z.email({ error: "Enter a valid email" }),
      otp: z.number({ error: "OTP should be a number" }),
    })
    .strict(),
});

export const NewsletterSchemas = {
  createOtpForNewsletter,
  subscribeInNewsletter,
};
