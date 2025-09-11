import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

import { OptimizeImage } from "@/components/optimize-image";
import { QuoteLeftIcon } from "@/icons/quote-left";
import { StarIcon } from "@/icons/star";

export const ReviewCard = () => {
    return (
        <Box>
            <OptimizeImage
                src="/images/user.svg"
                alt="Hero Carousel"
                height={100}
                width={100}
                sx={{ borderRadius: "50%", ml: 2 }}
            />
            <Box sx={{ border: 1, borderColor: "divider", p: 2, pt: 7, mt: "-45px" }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box>
                        <Typography variant="h4" fontWeight={600} gutterBottom>
                            Rakib Ahmed
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Web Developer
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="h4" textAlign="right" color="text.secondary" gutterBottom>5</Typography>
                        <Box display="flex" alignItems="center">
                            {Array.from({ length: 5 }, (_, i) => (
                                <StarIcon sx={{ width: 20, height: 20 }} color="primary" key={i} />
                            ))}
                        </Box>
                    </Box>
                </Box>

                <Box
                    display="flex"
                    alignItems="center"
                    gap={2}
                    my={3}
                >
                    <QuoteLeftIcon />
                    <Box height="1px" width="100%" flex={1} bgcolor='divider' />
                </Box>

                <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, recusandae hic, fugit nemo vero sed porro in pariatur architecto, amet quo similique eum modi sunt asperiores veritatis eius excepturi nobis?
                </Typography>
            </Box>
        </Box>
    )
}