export const OTPVerifier = async (
  userInputOtp: number,
  storedOtp: number,
  expirationTime: number
) => {
  const currentTime = new Date().getTime();

  if (currentTime > expirationTime) {
    return { success: false, message: "OTP has expired" };
  }

  if (userInputOtp === storedOtp) {
    return { success: true, message: "OTP verified successfully" };
  } else {
    return { success: false, message: "Invalid OTP" };
  }
};
