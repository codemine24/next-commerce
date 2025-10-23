import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import { OptimizeImage } from "@/components/optimize-image";
import { QuoteLeftIcon } from "@/icons/quote-left";
import { StarIcon } from "@/icons/star";

export interface ReviewCardProps {
  id: number;
  name: string;
  email?: string;
  avatar?: string;
  company?: string;
  designation?: string;
  comment: string;
  rating: number;
  platform: string;
  created_at: string;
  updated_at: string;
}

export const ReviewCard = ({
  name,
  avatar,
  company,
  designation,
  comment,
  rating,
}: ReviewCardProps) => {
  return (
    <Box>
      <OptimizeImage
        src={avatar}
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
              {designation}
              {company && ` • ${company}`}
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
          {comment}
        </Typography>
      </Box>
    </Box>
  );
};

// {
//         "name": "Herry Quark",
//         "email": "herry@gmail.com",
//         "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&fm=jpg&q=60&w=3000",
//         "company": "Microsoft INC",
//         "designation": "CTO",
//         "comment": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam illo sequi eos recusandae mollitia obcaecati dolor velit iure fugiat asperiores.",
//         "rating": 5,
//         "platform": "OFFLINE",
//         "created_at": "2025-10-23T04:27:08.140Z",
//     }
