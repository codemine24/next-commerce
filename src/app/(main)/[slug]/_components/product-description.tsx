import { Typography } from "@mui/material";
import Box from "@mui/material/Box"
import DOMPurify from 'isomorphic-dompurify';

import { ProductSectionHeader } from "./product-section-header";

export const ProductDescription = ({ description }: { description: string | null }) => {
    const sanitizedDescription = DOMPurify.sanitize(description || '');

    return (
        <Box id="#product-description">
            <ProductSectionHeader title="Description" />
            <Box sx={{ bgcolor: "background.paper", p: { xs: 2, sm: 3 } }}>
                {sanitizedDescription && <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />}
                {!sanitizedDescription && <Typography variant="body2">No description available</Typography>}
            </Box>
        </Box>
    )
}