import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import * as React from "react";

import { getQnAs } from "@/actions/qna";
import { getProfile } from "@/actions/user";

import { QuestionCard } from "./product-question-card";
import { ProductSectionHeader } from "./product-section-header";

export const ProductQuestions = async ({
  productId,
}: {
  productId: string;
}) => {
  console.log("productId", productId);

  // 2️⃣ Fetch QnAs using product.id
  const profile = await getProfile();
  const authUserId = profile?.data?.id as string | undefined;

  const response = await getQnAs({
    product_id: productId,
    ...(authUserId ? { inquirer_id: authUserId } : {}),
  });



  const questions = response.data;

  console.log("Fetched questions:", response.data);

  return (
    <Box id="#product-qna">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <ProductSectionHeader title="Customer Questions" />
      </Box>
      {questions.length === 0 && (
        <Box sx={{ bgcolor: "background.paper", p: { xs: 2, sm: 3 } }}>
          <Typography variant="body2" sx={{ color: "text.primary" }}>
            No questions found
          </Typography>
        </Box>
      )}
      <Stack spacing={1} mt={3}>
        {questions.map((question: any, index: number) => (
          <React.Fragment key={question.question}>
            <QuestionCard question={question} authUserId={authUserId} />
            {index < questions.length && (
              <Divider sx={{ borderBottom: "1px solid #E6F2EE" }} />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
};
