import React from "react";

import { stripe } from "@/app/api/(helpers)/shared/stripe";

type Props = {
  searchParams: { session_id: string; order_id: string };
};
const PaymentSuccessPage = async ({ searchParams }: Props) => {
  const { session_id, order_id } = searchParams;

  const paymentSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  console.log("payment session: ", paymentSession);

  return (
    <div>
      Payment success
      <h2>session_id: {session_id}</h2>
      <h2>order_id: {order_id}</h2>
    </div>
  );
};

export default PaymentSuccessPage;
