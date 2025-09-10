"use client";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import MuiRating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

import { CloseIcon } from "@/icons/close";
import { PlusIcon } from "@/icons/plus";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
};

export const ProductAddReview = () => {
    const router = useRouter();
    const path = usePathname();
    const isAuthenticated = true;
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState<number | null>(5);
    const [comment, setComment] = useState<string>("");

    const handleOpenReviewModal = () => {
        if (!isAuthenticated) {
            router.push(`/login?redirect=${path}`);
        } else {
            setOpen(true);
        }
    };

    const handleCloseReviewModal = () => {
        setOpen(false);
        setComment("");
        setRating(5);
    };

    const handleAddReview = async () => { };

    return (
        <>
            <Button variant="soft" startIcon={<PlusIcon />} onClick={handleOpenReviewModal}>
                Add Review
            </Button>

            <Modal
                open={open}
                onClose={handleCloseReviewModal}
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
                    <Box sx={style}>
                        <Box
                            px={2}
                            py={1}
                            borderBottom={1}
                            borderColor="divider"
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography id="modal-modal-title" variant="body1">
                                Add Review
                            </Typography>
                            <IconButton onClick={handleCloseReviewModal}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box p={2}>
                            <Typography variant="body1">
                                Rate this product
                            </Typography>

                            <MuiRating
                                value={rating}
                                precision={0.5}
                                onChange={(event, newValue) => setRating(newValue)}
                                readOnly={false}
                                sx={{ mt: 2 }}
                            />

                            <Box mt={2}>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    id="outlined-basic"
                                    placeholder="Write your review here"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </Box>

                            <Button
                                variant="contained"
                                color="primary"
                                size="medium"
                                onClick={handleAddReview}
                                sx={{ mt: 2 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    );
};