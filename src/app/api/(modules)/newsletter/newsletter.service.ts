import httpStatus from "http-status";

import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import { OTPTemplate } from "../../(helpers)/template/otp-template";
import emailSender from "../../(helpers)/utils/email-sender";
import { OTPGenerator } from "../../(helpers)/utils/helper";
import { OTPVerifier } from "../../(helpers)/utils/otp-verifier";

import {
  CreateOtpForNewsletterPayload,
  SubscribeInNewsletterPayload,
} from "./newsletter.interface";

// ------------------------------------- CREATE OTP FOR NEWSLETTER --------------------------------
const createOtpForNewsletter = async (data: CreateOtpForNewsletterPayload) => {
  const generatedOTP = OTPGenerator();
  const expirationTime = (new Date().getTime() + 5 * 60000).toString();
  const emailBody = OTPTemplate(String(generatedOTP));

  const emailResponse = await emailSender(
    data.email,
    emailBody,
    "Verify your email"
  );

  if (emailResponse?.accepted?.length === 0)
    throw new CustomizedError(
      httpStatus.INTERNAL_SERVER_ERROR,
      "Failed to send OTP"
    );

  const result = await prisma.newsLetterOTP.create({
    data: {
      email: data.email,
      otp: generatedOTP,
      expires_at: expirationTime,
    },
    select: {
      email: true,
      expires_at: true,
    },
  });

  return result;
};

// ------------------------------------- SUBSCRIBE IN NEWSLETTER ----------------------------------
const subscribeInNewsletter = async (data: SubscribeInNewsletterPayload) => {
  const storedOTP = await prisma.newsLetterOTP.findFirst({
    where: {
      otp: Number(data.otp),
      email: data.email,
    },
  });

  if (!storedOTP) {
    throw new CustomizedError(httpStatus.FORBIDDEN, "OTP not matched");
  }

  const verifiedOTP = await OTPVerifier(
    Number(data.otp),
    storedOTP.otp,
    Number(storedOTP.expires_at)
  );

  if (verifiedOTP.success === false) {
    throw new CustomizedError(httpStatus.FORBIDDEN, verifiedOTP.message);
  }

  const result = await prisma.$transaction(async (tx) => {
    const subscriber = await tx.newsLetter.create({
      data: {
        email: storedOTP.email,
      },
    });

    await tx.newsLetterOTP.delete({
      where: {
        otp: Number(data.otp),
        email: subscriber.email,
      },
    });

    return subscriber;
  });

  return result;
};

export const NewsletterServices = {
  createOtpForNewsletter,
  subscribeInNewsletter,
};
