import { OTPTemplate } from "../../(helpers)/template/otp-template";
import { OTPGenerator } from "../../(helpers)/utils/helper";

const createOtpForNewsletter = async () => {
  const generatedOTP = OTPGenerator();
  const expirationTime = (new Date().getTime() + 5 * 60000).toString();
  const emailBody = OTPTemplate(String(generatedOTP));
  return { generatedOTP, expirationTime, emailBody };
};

export const NewsletterServices = { createOtpForNewsletter };
