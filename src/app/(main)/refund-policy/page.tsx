import React from "react";
import { refundPolicyData } from "./refund-policy-data";
import DOMPurify from "isomorphic-dompurify";
import { Box } from "@mui/material";
import { BORDER_RADIUS } from "@/theme";
import { BoxContainer } from "@/components/box-container";

interface RefundPolicy {
  title: string | null;
  description: string | null;
}

const RefundPolicy = () => {
  const { title, description }: RefundPolicy = refundPolicyData;
  const sanitizedTitle = DOMPurify.sanitize(title || "");
  const sanitizedDescription = DOMPurify.sanitize(description || "");
  return (
    <BoxContainer sx={{ py: 2 }}>
      <Box
        sx={{
          bgcolor: "background.paper",
          p: 2,
          borderRadius: BORDER_RADIUS.default,
        }}
      >
        {refundPolicyData && (
          <>
            <Box dangerouslySetInnerHTML={{ __html: sanitizedTitle }}></Box>
            <Box
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            ></Box>
          </>
        )}
      </Box>
    </BoxContainer>
  );
};

export default RefundPolicy;
