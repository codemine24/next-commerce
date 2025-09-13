import { Box } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";

import { BoxContainer } from "@/components/box-container";
import { BORDER_RADIUS } from "@/theme";

import { nextCommercePolicyData } from "./next-commerce-policy-data";
interface TechTongPointPolicy {
  title: string | null;
  description: string | null;
}
const TechTongPointPolicy = () => {
  const { title, description }: TechTongPointPolicy = nextCommercePolicyData;
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
        {nextCommercePolicyData && (
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

export default TechTongPointPolicy;
