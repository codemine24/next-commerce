import { Prisma } from "@prisma/client";
import httpStatus from "http-status";

import CustomizedError from "../../(helpers)/error/customized-error";
import { prisma } from "../../(helpers)/shared/prisma";
import { OTPTemplate } from "../../(helpers)/template/otp-template";
import emailSender from "../../(helpers)/utils/email-sender";
import { OTPGenerator } from "../../(helpers)/utils/helper";
import { OTPVerifier } from "../../(helpers)/utils/otp-verifier";
import paginationMaker from "../../(helpers)/utils/pagination-maker";
import queryValidator from "../../(helpers)/utils/query-validator";

import {
  CreateOtpForNewsletterPayload,
  SubscribeInNewsletterPayload,
} from "./newsletter.interface";
import {
  subscriberQueryValidationConfig,
  subscriberSearchableFields,
} from "./newsletter.utils";

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

// ------------------------------------- GET SUBSCRIBERS ------------------------------------------
const getSubscribers = async (query: Record<string, any>) => {
  const {
    page,
    limit,
    sort_by = "email",
    sort_order,
    search_term,
    is_verified,
  } = query;

  if (sort_by)
    queryValidator(subscriberQueryValidationConfig, "sort_by", sort_by);
  if (sort_order)
    queryValidator(subscriberQueryValidationConfig, "sort_order", sort_order);

  const { pageNumber, limitNumber, skip, sortWith, sortSequence } =
    paginationMaker({
      page,
      limit,
      sort_by,
      sort_order,
    });

  const andConditions: Prisma.NewsLetterWhereInput[] = [];

  if (search_term) {
    andConditions.push({
      OR: subscriberSearchableFields.map((field) => {
        return {
          [field]: {
            contains: search_term,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  if (is_verified) {
    andConditions.push({
      is_verified: is_verified === "true",
    });
  }

  const whereConditions = {
    AND: andConditions,
  };

  const [result, total] = await Promise.all([
    prisma.newsLetter.findMany({
      where: whereConditions,
      skip: skip,
      take: limitNumber,
      orderBy: {
        [sortWith]: sortSequence,
      },
    }),
    prisma.newsLetter.count({ where: whereConditions }),
  ]);

  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total,
    },
    data: result,
  };
};

export const NewsletterServices = {
  createOtpForNewsletter,
  subscribeInNewsletter,
  getSubscribers,
};
