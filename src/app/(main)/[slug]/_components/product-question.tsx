import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import * as React from "react";

import { QuestionCard } from "./product-question-card";
import { ProductSectionHeader } from "./product-section-header";

const questions = [
  {
    question: "Is the F&D W4 speaker truly portable?",
    author: "Kabir Ahmed",
    date: "September 2025",
    answer:
      "The M23 is built with a solid oak wood frame finished in natural walnut for durability and elegance.",
  },
  {
    question: "Can I play music without using Bluetooth?",
    author: "Kabir Ahmed",
    date: "September 2025",
    answer:
      "The M23 is built with a solid oak wood frame finished in natural walnut for durability and elegance.",
  },
  {
    question: "What version of Bluetooth does it use?",
    author: "Kabir Ahmed",
    date: "September 2025",
    answer:
      "The M23 is built with a solid oak wood frame finished in natural walnut for durability and elegance.",
  },
];

export const ProductQuestions = () => {
  return (
    <Box id="#product-qna">
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <ProductSectionHeader title="Customer Questions" />
      </Box>

      <Stack spacing={1} mt={3}>
        {questions.map((q, index) => (
          <React.Fragment key={q.question}>
            <QuestionCard {...q} />
            {index < questions.length && (
              <Divider sx={{ borderBottom: "1px solid #E6F2EE" }} />
            )}
          </React.Fragment>
        ))}
      </Stack>
    </Box>
  );
};
