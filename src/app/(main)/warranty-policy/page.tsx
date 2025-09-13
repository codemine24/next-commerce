import { Box } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import React from "react";

import { BoxContainer } from "@/components/box-container";
import { BORDER_RADIUS } from "@/theme";

import { warrantyPolicyData } from "./warranty-policy-data";

interface WarrantyPolicy {
  title: string | null;
  description: string | null;
}
const WarrantyPolicy = () => {
  const { title, description }: WarrantyPolicy = warrantyPolicyData;
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
        {warrantyPolicyData && (
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

export default WarrantyPolicy;
