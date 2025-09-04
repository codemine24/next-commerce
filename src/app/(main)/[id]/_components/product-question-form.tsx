"use client"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import Fade from "@mui/material/Fade"
import Backdrop from "@mui/material/Backdrop"
import { CloseIcon } from "@/icons/close"
import React from "react"


export const ProductQuestionForm = () => {
    const [open, setOpen] = React.useState(false)
    const handleClose = () => setOpen(false)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert("Thanks! Your question has been submitted.")
    }

    return (
        <>
            <Button
                variant="soft"
                color="primary"
                size="medium"
                onClick={() => setOpen(true)}
            >
                {"Ask a Question"}
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
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
                    <Box
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            width: 400,
                            bgcolor: "background.paper",
                            border: "1px solid",
                            borderColor: "divider",
                            p: 3,
                            outline: "none",
                        }}
                    >
                        <CloseIcon
                            onClick={handleClose}
                            sx={{
                                position: "absolute",
                                top: 16,
                                right: 16,
                                cursor: "pointer",
                            }}
                        />
                        <Typography variant="h4">Ask a Question</Typography>
                        <Box component="form" mt={2} onSubmit={handleSubmit}>
                            <Stack spacing={1.5}>
                                <TextField
                                    placeholder="Your Email"
                                    size="small"
                                />
                                <TextField
                                    placeholder="Write your question here..."
                                    multiline
                                    minRows={4}
                                    size="small"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    sx={{ height: 50 }}
                                >
                                    Submit
                                </Button>
                            </Stack>
                        </Box>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}