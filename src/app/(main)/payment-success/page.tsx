import React from "react";

type Props = {
  searchParams: { session_id: string; order_id: string };
};
const PaymentSuccessPage = ({ searchParams }: Props) => {
  const { session_id, order_id } = searchParams;

  return (
    <div>
      Payment success
      <h2>session_id: {session_id}</h2>
      <h2>order_id: {order_id}</h2>
    </div>
  );
};

export default PaymentSuccessPage;
