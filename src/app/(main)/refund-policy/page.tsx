import { Box } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import React from "react";

import { BoxContainer } from "@/components/box-container";
import { BORDER_RADIUS } from "@/theme";

import { refundPolicyData } from "./refund-policy-data";


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
