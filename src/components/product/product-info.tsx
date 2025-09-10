import { Chip } from "@mui/material"
import Box from "@mui/material/Box"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"

import { StarIcon } from "@/icons/star"

import { ProductActionButton } from "./product-action-button"

export const ProductInfo = () => {
    return (
        <Box>
            <Typography variant="h3">
                Reddragon 59S5 RGB Speaker
            </Typography>

            {/* Rating & Stock */}
            <Box display="flex" alignItems="center" gap={2} mt={2}>
                <Box display="flex" alignItems="center">
                    {Array(5).fill(0).map((_, index) => (
                        <StarIcon key={index} fontSize="small" />
                    ))}
                    (5.0)
                </Box>
                <Divider orientation="vertical" flexItem />
                <Typography>640 Reviews</Typography>
                <Chip label="In Stock" color="primary" variant="outlined" />
            </Box>

            {/* Price */}
            <Box display="flex" alignItems="center" gap={2} mt={4}>
                <Typography variant="h4">
                    Tk 1,200
                </Typography>
                <Typography variant="h6" fontWeight={400} sx={{ textDecoration: "line-through" }}>
                    Tk 1,500
                </Typography>
            </Box>

            {/* Action Button */}
            <ProductActionButton />
        </Box>
    )
}