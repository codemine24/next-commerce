import { Box } from "@mui/material";
import { privacyData } from "./privacy-data";
import { BORDER_RADIUS } from "@/theme";
import { BoxContainer } from "@/components/box-container";
import DOMPurify from "isomorphic-dompurify";
interface PrivacyData {
  title: string | null;
  description: string | null;
}
const Privacy = () => {
  const { title, description }: PrivacyData = privacyData;
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
        {privacyData && (
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

export default Privacy;
