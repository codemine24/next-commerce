import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import { ProductCarousel } from "../../[id]/_components/product-carousel";
import { ProductInfo } from "../../[id]/_components/product-info";
import { CloseIcon } from "@/icons/close";
import Fade from "@mui/material/Fade"
import Backdrop from "@mui/material/Backdrop"

const images = [
    "https://placehold.co/600x400/png",
    "https://placehold.co/800x400/png",
    "https://placehold.co/600x400/png",
    "https://placehold.co/600x400/png",
    "https://placehold.co/600x400/png",
    "https://placehold.co/600x400/png",
    "https://placehold.co/600x400/png",
]

interface ProductQuickViewProps {
    open: boolean;
    onClose: () => void;
}

export const ProductQuickView = ({ open, onClose }: ProductQuickViewProps) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Fade in={open} timeout={500}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: { xs: "90%", md: "80vw" },
                    maxWidth: "950px",
                    maxHeight: "90vh",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    p: 3,
                    overflowY: "auto",
                }}>
                    <CloseIcon
                        onClick={onClose}
                        sx={{ position: "absolute", top: 16, right: 16, cursor: "pointer" }}
                    />
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <ProductCarousel images={images} thumbDirection="vertical" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <ProductInfo />
                        </Grid>
                    </Grid>
                </Box>
            </Fade>
        </Modal>
    );
};