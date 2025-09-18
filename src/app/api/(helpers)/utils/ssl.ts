// import SSLCommerzPayment from "sslcommerz-lts";

// type TPaymentInfo = {
//   total_amount: number;
//   transactionId: string;
//   delivery_method: string;
//   products: {
//     name: string;
//     price: number;
//   }[];
//   user: {
//     name: string;
//     email: string;
//     address: string;
//     phone: string;
//     city: string;
//     country: string;
//     postal_code: string;
//   };
// };

// export const SSLPaymentInitiate = async (paymentInfo: TPaymentInfo) => {
//   const paymentData = {
//     total_amount: paymentInfo.total_amount,
//     currency: "BDT",
//     tran_id: paymentInfo.transactionId,
//     success_url: `${config.server_url}/api/v1/payment/success?transactionId=${paymentInfo.transactionId}`,
//     fail_url: `${config.server_url}/api/v1/payment/failed?transactionId=${paymentInfo.transactionId}`,
//     cancel_url: `${config.server_url}/api/v1/payment/cancel?transactionId=${paymentInfo.transactionId}`,
//     ipn_url: "http://localhost:3030/ipn",
//     shipping_method: paymentInfo.delivery_method,
//     product_name: paymentInfo.products.map((product) => product.name).join(","),
//     product_category: "Electronic",
//     product_profile: "general",
//     cus_name: `${paymentInfo.user.name}`,
//     cus_email: paymentInfo.user.email,
//     cus_add1: paymentInfo.user.address,
//     cus_add2: "Dhaka",
//     cus_city: paymentInfo.user.city,
//     cus_state: "Dhaka",
//     cus_postcode: `${paymentInfo.user.postal_code}`,
//     cus_country: paymentInfo.user.country,
//     cus_phone: paymentInfo.user.phone,
//     cus_fax: "01711111111",
//     ship_name: `${paymentInfo.user.name}`,
//     ship_add1: "Dhaka",
//     ship_add2: "Dhaka",
//     ship_city: "Dhaka",
//     ship_state: "Dhaka",
//     ship_postcode: 1000,
//     ship_country: "Bangladesh",
//   };

//   const sslcz = new SSLCommerzPayment(
//     config.sslcommerz_store_id as string,
//     config.sslcommerz_store_password as string,
//     config.node_env === "development" ? false : true
//   );

//   const apiResponse = await sslcz.init(paymentData);
//   return apiResponse;
// };
