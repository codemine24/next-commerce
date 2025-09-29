import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export type QuestionCardProps = {
  question: string;
  author: string;
  date: string;
  answer: string;
};

export const QuestionCard = ({
  question,
  author,
  date,
  answer,
}: QuestionCardProps) => {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        borderRadius: 2,
      }}
      role="article"
      aria-label={`Question: ${question}`}
    >
      <Stack spacing={1.25}>
        <Stack direction="row" spacing={1.25} alignItems="baseline">
          <Typography component="span" sx={{ fontSize: 16, fontWeight: 600 }}>
            {"Q."}
          </Typography>
          <Typography
            component="h3"
            variant="subtitle1"
            sx={{ fontSize: 16, fontWeight: 600 }}
          >
            {question}
          </Typography>
        </Stack>

        <Typography
          variant="body2"
          sx={{ color: "#A4B2AE", display: "block", fontWeight: 400 }}
        >
          {`By ${author}  |  ${date}`}
        </Typography>

        <Box>
          <Typography variant="body1" sx={{ color: "text.primary" }}>
            {answer}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};
