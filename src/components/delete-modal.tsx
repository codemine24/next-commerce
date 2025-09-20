"use client";

import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import { CloseIcon } from "@/icons/close";

import { FadeTransition } from "./fade-transition";

interface DeleteModalProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
    onConfirm: () => void;
    loading?: boolean;
}

export const DeleteModal = ({ open, onClose, title, description, onConfirm, loading }: DeleteModalProps) => {
    return (
        <Modal open={open} onClose={onClose}>
            <FadeTransition in={open} timeout={500}>
                <Box sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    width: 350,
                }}>
                    <Box width="100%" position="relative">
                        <IconButton
                            onClick={onClose}
                            sx={{
                                position: "absolute",
                                top: 1,
                                right: 1
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Box p={3}>
                            <Typography variant="h5" fontWeight={600} gutterBottom>{title}</Typography>
                            <Typography variant="body1">{description}</Typography>

                            <Box display="flex" justifyContent="flex-end" gap={2} mt={5}>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={onConfirm}
                                    disabled={loading}
                                >
                                    {loading ? "Deleting..." : "Confirm"}
                                </Button>
                                <Button
                                    variant="contained"
                                    onClick={onClose}
                                    disabled={loading}
                                >
                                    Cancel
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </FadeTransition>
        </Modal >
    )
}