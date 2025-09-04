"use client"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Typography from "@mui/material/Typography"
import { CloseIcon } from "@/icons/close"

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid",
    borderColor: "divider",
    p: 3,
}

interface ProductQuestionFormProps {
    open: boolean
    onClose: () => void
}

export const ProductQuestionForm = ({ open, onClose }: ProductQuestionFormProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert("Thanks! Your question has been submitted.")
    }
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <CloseIcon
                    onClick={onClose}
                    sx={{ position: "absolute", top: 16, right: 16, cursor: "pointer" }}
                />
                <Typography
                    variant="h4"
                >
                    Ask a Question
                </Typography>
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
                            {"Submit"}
                        </Button>
                    </Stack>
                </Box>
            </Box>
        </Modal>
    )
}