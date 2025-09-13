import { BORDER_RADIUS } from "@/theme";
import { SxProps } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const SectionTitle = ({
  title,
  sx,
}: {
  title: string;
  sx?: SxProps;
}) => {
  return (
    <Paper
      aria-label={title}
      sx={{
        bgcolor: "primary.main",
        color: "common.white",
        px: 2,
        py: 1,
        borderRadius: BORDER_RADIUS.default,
      }}
    >
      <Typography variant="h5" sx={{ ...sx }}>
        {title}
      </Typography>
    </Paper>
  );
};
