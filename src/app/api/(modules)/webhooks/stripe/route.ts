import { NextResponse } from "next/server";

import { prisma } from "@/app/api/(helpers)/shared/prisma";
import { stripe } from "@/app/api/(helpers)/shared/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const orderId = session.success_url?.split("order_id=")[1];

      await prisma.payment.updateMany({
        where: { order_id: orderId },
        data: {
          status: "PAID",
          transaction_id: session.payment_intent,
          paid_at: new Date(),
        },
      });
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
