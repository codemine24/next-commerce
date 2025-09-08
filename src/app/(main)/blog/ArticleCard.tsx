"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { orange } from "@mui/material/colors";
import { AccountCircleIcon } from "@/icons/account-circle";
import { AccessTimeIcon } from "@/icons/access-time";
interface Article {
  slug: string;
  image: string;
  overlayText: string;
  title: string;
  author: string;
  date: string;
  description: string;
}
interface BlogCardProps {
  article: Article;
}

const OverlayText = styled("div")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: "white",
  padding: theme.spacing(1),
}));

export const ArticleCard: React.FC<BlogCardProps> = ({ article }) => {
  const router = useRouter();
  return (
    <Card
      sx={{
        maxWidth: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        ":hover": { cursor: "initial" },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="auto"
          width={"100%"}
          image={article.image}
          alt={article.title}
        />
        <OverlayText>
          <Typography variant="h6" sx={{ color: orange[500], ml: 1.5 }}>
            {article.overlayText}
          </Typography>
        </OverlayText>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Chip
            icon={<AccountCircleIcon />}
            size="small"
            label={article.author}
          />

          <Chip
            icon={<AccessTimeIcon />}
            size="small"
            label={article.date}
            sx={{ sm: { display: "none" } }}
          />
        </Grid>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography gutterBottom variant="h6" component="h4" minHeight={70}>
            {article.title}
          </Typography>
          <Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                mt: 2,
              }}
              onClick={() => router.push(`blog/${article.slug}`)}
            >
              Read more...
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};
