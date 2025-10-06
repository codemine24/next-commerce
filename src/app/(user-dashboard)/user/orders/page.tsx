import { getMyOrders } from "@/actions/order";

import { OrderTable } from "./_components/order-table";

export default async function OrdersPage() {
  const orders = await getMyOrders();
  return <OrderTable orders={orders.data} />;
}
