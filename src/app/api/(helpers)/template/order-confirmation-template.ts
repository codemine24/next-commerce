import { CONFIG } from "../config";

export const OrderConfirmationTemplate = (
  orderId: string,
  customerName: string,
  orderItems: { name: string; quantity: number; price: number }[],
  total: number
) => {
  const itemsHTML = orderItems
    .map(
      (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #dddddd;">${
          item.name
        }</td>
        <td style="padding: 10px; border-bottom: 1px solid #dddddd; text-align: center;">${
          item.quantity
        }</td>
        <td style="padding: 10px; border-bottom: 1px solid #dddddd; text-align: right;">$${item.price.toFixed(
          2
        )}</td>
      </tr>
    `
    )
    .join("");

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmation - [APP NAME]</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
      
      <!-- Header -->
      <tr>
        <td style="padding: 20px 0; text-align: center; background-color: #4f46e5;">
          <img src="https://img.freepik.com/premium-vector/bird-logo-design-vector-illustration_898026-1003.jpg" alt="Logo" style="max-width: 200px; height: auto;" />
        </td>
      </tr>

      <!-- Main Content -->
      <tr>
        <td style="background-color: #ffffff; padding: 40px 30px;">
          <h1 style="margin: 0 0 20px; font-size: 24px; color: #333;">Order Confirmation</h1>
          <p style="font-size: 16px; line-height: 24px; margin: 0 0 10px;">Hi <strong>${customerName}</strong>,</p>
          <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px;">Thank you for your purchase! We’re excited to let you know that we’ve received your order <strong>#${orderId}</strong>. Below are your order details:</p>

          <!-- Order Details Table -->
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="border: 1px solid #dddddd; border-radius: 5px; margin-bottom: 20px;">
            <thead>
              <tr style="background-color: #f9fafb;">
                <th style="padding: 10px; text-align: left; border-bottom: 1px solid #dddddd;">Product</th>
                <th style="padding: 10px; text-align: center; border-bottom: 1px solid #dddddd;">Quantity</th>
                <th style="padding: 10px; text-align: right; border-bottom: 1px solid #dddddd;">Price</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
            <tfoot>
              <tr>
                <td colspan="2" style="padding: 10px; text-align: right; font-weight: bold;">Total:</td>
                <td style="padding: 10px; text-align: right; font-weight: bold; color: #4f46e5;">$${total.toFixed(
                  2
                )}</td>
              </tr>
            </tfoot>
          </table>

          <!-- Info -->
          <p style="font-size: 16px; line-height: 24px; margin: 0 0 20px;">You will receive another email once your items have been shipped.</p>

          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; border-left: 4px solid #4f46e5;">
            <tr>
              <td style="padding: 15px; background-color: #f9fafb;">
                <p style="margin: 0; font-size: 16px; line-height: 24px;"><strong>Need help?</strong></p>
                <p style="margin: 5px 0 0; font-size: 16px; line-height: 24px;">If you have any questions about your order, please contact our support team at <a href="mailto:support@[APP NAME].com" style="color: #4f46e5; text-decoration: none;">support@${CONFIG.app_name
                  ?.split(" ")
                  .join("")
                  .toLowerCase()}.com</a>.</p>
              </td>
            </tr>
          </table>

          <p style="margin: 0; font-size: 16px; line-height: 24px;">Thank you for shopping with <strong>${
            CONFIG.app_name
          }</strong>!</p>
          <p style="margin: 10px 0 0; font-size: 16px; line-height: 24px;">Best regards,<br>The ${
            CONFIG.app_name
          } Team</p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background-color: #f4f4f4; padding: 20px 30px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
            <tr>
              <td style="text-align: center; padding-bottom: 10px; color: #666; font-size: 14px;">
                <p style="margin: 0 0 10px;">&copy; 2025 ${
                  CONFIG.app_name
                }. All rights reserved.</p>
                <p style="margin: 0;">[Address]</p>
              </td>
            </tr>
            <tr>
              <td style="text-align: center; color: #666; font-size: 14px;">
                <p style="margin: 0 0 10px;"><strong>Security Tip:</strong> We will never ask for your payment details via email.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
};
