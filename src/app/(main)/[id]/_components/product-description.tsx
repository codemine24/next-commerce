import Box from "@mui/material/Box"
import DOMPurify from 'isomorphic-dompurify';
import { ProductSectionHeader } from "./product-section-header";

export const ProductDescription = ({ description }: { description: string | null }) => {
    const sanitizedDescription = DOMPurify.sanitize(description || '');

    return (
        <Box id="#product-description">
            <ProductSectionHeader title="Description" />
            <Box sx={{ bgcolor: "background.paper", p: { xs: 2, sm: 3 } }}>
                <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
            </Box>
        </Box>
    )
}