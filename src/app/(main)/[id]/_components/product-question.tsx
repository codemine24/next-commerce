import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import * as React from "react"

import { QuestionCard } from "./product-question-card";
import { ProductQuestionForm } from "./product-question-form";
import { ProductSectionHeader } from "./product-section-header";


const questions = [
    {
        question: "Is the F&D W4 speaker truly portable?",
        author: "Kabir Ahmed",
        date: "September 2025",
        answer:
            "Yes, absolutely. The W4 is ultra-compact (only 52 × 52 × 52 mm) and weighs just 220 grams, making it easy to carry in your hand, pocket, or bag.",
    },
    {
        question: "Can I play music without using Bluetooth?",
        author: "Kabir Ahmed",
        date: "September 2025",
        answer:
            "Yes! It supports TF (micro‑SD) card playback, allowing you to play music directly from a memory card without any wireless connection.",
    },
    {
        question: "What version of Bluetooth does it use?",
        author: "Kabir Ahmed",
        date: "September 2025",
        answer:
            "The F&D W4 uses Bluetooth 4.0, which ensures stable wireless connectivity and efficient power usage.",
    },
]

export const ProductQuestions = () => {
    return (
        <Box id="#product-qna">
            {/* Section header */}
            <Box display="flex" alignItems="center" justifyContent="space-between" gap={2}>
                <ProductSectionHeader title="Customer Questions" />
                <ProductQuestionForm />
            </Box>

            <Stack spacing={1} mt={2} bgcolor="background.paper">
                {questions.map((q, index) => (
                    <React.Fragment key={q.question}>
                        <QuestionCard {...q} />
                        {index < questions.length - 1 && (
                            <Divider sx={{ my: 2, bgcolor: "divider" }} />
                        )}
                    </React.Fragment>
                ))}
            </Stack>
        </Box>
    )
}