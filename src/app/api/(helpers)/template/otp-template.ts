export const OTPTemplate = (otp: string) => {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email Address</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333333;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto;">
            <!-- Header -->
            <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #4f46e5;">
                <img
                src="https://img.freepik.com/premium-vector/bird-logo-design-vector-illustration_898026-1003.jpg" alt="Logo" style="max-width: 200px; height: auto;">
            </td>
            </tr>

            <!-- Main Content -->
            <tr>
            <td style="background-color: #ffffff; padding: 40px 30px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                    <td>
                    <h1 style="margin: 0 0 20px 0; font-size: 24px; line-height: 30px; color: #333333; font-weight: bold;">Verify Your Email Address</h1>
                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px;">Thank you for registering with [APP NAME]. To complete your registration and verify your email address, please use the verification code below:</p>

                    <!-- OTP Box -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px;">
                        <tr>
                        <td style="padding: 25px; background-color: #f9fafb; border: 1px solid #dddddd; border-radius: 5px; text-align: center;">
                            <p style="margin: 0; font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #4f46e5; font-family: monospace;">${otp}</p>
                        </td>
                        </tr>
                    </table>

                    <p style="margin: 0 0 10px 0; font-size: 16px; line-height: 24px;">Please enter this code on the verification page to confirm your email address.</p>
                    <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 24px;">This code will expire in <strong>5 minutes</strong>.</p>

                    <!-- Instructions -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-bottom: 20px; border-left: 4px solid #4f46e5;">
                        <tr>
                        <td style="padding: 15px; background-color: #f9fafb;">
                            <p style="margin: 0; font-size: 16px; line-height: 24px;"><strong>Why verify your email?</strong></p>
                            <ul style="margin: 10px 0 0 0; padding-left: 20px;">
                            <li style="margin-bottom: 5px;">Ensure we can contact you about your account</li>
                            <li style="margin-bottom: 5px;">Protect your account from unauthorized access</li>
                            <li style="margin-bottom: 0;">Receive important notifications and updates</li>
                            </ul>
                        </td>
                        </tr>
                    </table>

                    <p style="margin: 0 0 10px 0; font-size: 16px; line-height: 24px;">If you didn't create an account with [APP NAME], you can safely ignore this email.</p>

                    <p style="margin: 0; font-size: 16px; line-height: 24px;">Best regards,<br>The [APP NAME] Team</p>
                    </td>
                </tr>
                </table>
            </td>
            </tr>

            <!-- Footer -->
            <tr>
            <td style="background-color: #f4f4f4; padding: 20px 30px;">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                    <td style="text-align: center; padding-bottom: 10px; color: #666666; font-size: 14px;">
                    <p style="margin: 0 0 10px 0;">&copy; 2025 [APP NAME]. All rights reserved.</p>
                    <p style="margin: 0;">[Address]</p>
                    </td>
                </tr>
                <tr>
                    <td style="text-align: center; color: #666666; font-size: 14px;">
                    <p style="margin: 0 0 10px 0;"><strong>Security Tip:</strong> We will never ask you to share this verification code with anyone.</p>
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
