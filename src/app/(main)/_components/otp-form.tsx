import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useSearchParams } from "next/navigation";
import { useRef, useState, useTransition } from "react";

import { verifyOtpForNewsletter } from "@/actions/newsletter";
import { SubmitButton } from "@/components/submit-button";
import { toast } from "@/lib/toast-store";

interface OTPFormProps {
  setIsEmailSubmitted: (value: "email" | "otp") => void;
  resetEmailForm: () => void;
}

const length = 6;

export const OTPForm = ({
  setIsEmailSubmitted,
  resetEmailForm,
}: OTPFormProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""));
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const [isLoading, startTransition] = useTransition();

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;
    setError("");

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value !== "" && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent, index: number) => {
    e.preventDefault();
    setError("");
    const pasteData = e.clipboardData.getData("text");
    const pasteArray = pasteData.slice(0, length - index).split("");

    if (pasteArray.every((char) => !isNaN(Number(char)))) {
      const newOtp = [...otp];
      pasteArray.forEach((char, i) => {
        if (index + i < length) {
          newOtp[index + i] = char;
        }
      });
      setOtp(newOtp);

      const nextIndex = Math.min(index + pasteArray.length, length - 1);
      inputRefs.current[nextIndex]?.focus();
    } else {
      setError("Invalid OTP, should be numeric only.");
    }
  };

  const onSubmitOtp = async () => {
    const otpNumber = Number(otp.join(""));
    const email = searchParams.get("email");
    if (!email) {
      setError("Missing email. Please restart verification.");
      return;
    }
    if (!otpNumber) {
      setError("Missing OTP. Please restart verification.");
      return;
    }
    startTransition(async () => {
      const res = await verifyOtpForNewsletter(email, otpNumber);
      if (res.success) {
        toast.success("OTP verified successfully");
        setIsEmailSubmitted("email");
        resetEmailForm();
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      <Box display="flex" flexDirection="row" gap={1}>
        <Box display="flex" gap={{ xs: 0.5, md: 1 }}>
          {otp?.map((data, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: "center",
                  fontWeight: "bold",
                },
              }}
              value={data}
              onChange={(e) =>
                handleChange(e.target as HTMLInputElement, index)
              }
              onPaste={(e) => handlePaste(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onFocus={(e) => e.target.select()}
              variant="outlined"
              sx={{
                "& input": {
                  fontSize: { xs: "1rem", md: "1.5rem" },
                  padding: { xs: 0.8 },
                  color: "#ffffff",
                },
                "& .MuiOutlinedInput-root": {
                  "&:hover fieldset": {
                    borderColor: data ? "#4caf50" : "#acacac", // 👈 same as normal (no hover effect)
                  },
                  "& fieldset": {
                    borderColor: data ? "#4caf50" : "#acacac",
                    borderWidth: data ? "2px" : "1px",
                  },
                },
                "& .MuiInputBase-root": {
                  width: { xs: 35, md: 45, lg: 40 },
                  height: { xs: 35, md: 45, lg: 50 },
                },
              }}
              autoComplete="one-time-code"
              inputMode="numeric"
            />
          ))}
        </Box>
        <SubmitButton
          onClick={onSubmitOtp}
          label="Verify"
          isLoading={isLoading}
          disabled={isLoading}
          sx={{ "&:disabled": { color: "#fff" } }}
        />
      </Box>
    </>
  );
};