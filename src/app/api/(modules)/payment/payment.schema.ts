import z from "zod";

const updatePaymentInfo = z.object({
  body: z
    .object({
      order_id: z
        .string({ error: "Order id should be a valid uuid or text" })
        .min(1, "Order id is required"),
      payment_session_id: z
        .string({ error: "Payment session id should be a text" })
        .startsWith(
          "cs_",
          "Payment session id should be a valid stripe checkout session id"
        ),
    })
    .strict(),
});

export const PaymentSchemas = { updatePaymentInfo };
