import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import { OptimizeImage } from "@/components/optimize-image";
import { QuoteLeftIcon } from "@/icons/quote-left";
import { StarIcon } from "@/icons/star";

interface ReviewCardProps {
  id: number;
  image: string;
  name: string;
  role: string;
  rating: number;
  review: string;
}

export const ReviewCard = ({
  image,
  name,
  role,
  rating,
  review,
}: ReviewCardProps) => {
  return (
    <Box sx={{ height: "340px" }}>
      <OptimizeImage
        src={image}
        alt="Hero Carousel"
        height={100}
        width={100}
        sx={{ borderRadius: "50%", ml: 2 }}
      />
      <Box sx={{ border: 1, borderColor: "divider", p: 2, pt: 7, mt: "-45px" }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" fontWeight={500} gutterBottom>
              {name}
            </Typography>
            <Typography variant="body2" color="text.divider">
              {role}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              textAlign="right"
              color="text.secondary"
              gutterBottom
            >
              {rating}/5
            </Typography>
            <Box display="flex" alignItems="center">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon
                  sx={{ width: 20, height: 20, color: "#FFCD4E" }}
                  key={i}
                />
              ))}
            </Box>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={2} my={3}>
          <QuoteLeftIcon />
          <Box height="1px" width="100%" flex={1} bgcolor="divider" />
        </Box>

        <Typography variant="body1" color="text.secondary">
          {review}
        </Typography>
      </Box>
    </Box>
  );
};
