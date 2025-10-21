export interface CreateOtpForNewsletterPayload {
  email: string;
}

export interface SubscribeInNewsletterPayload {
  email: string;
  otp: number;
}
