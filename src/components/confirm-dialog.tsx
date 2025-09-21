import { DialogContent, IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CloseIcon } from "@/icons/close";
import { AnimatedDialog } from "./modal/animate-dialog";

interface ConfirmDialogProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
    onConfirm: () => void;
    loading?: boolean;
}

export const ConfirmDialog = (props: ConfirmDialogProps) => {
    const { open, onClose, title, description, onConfirm, loading } = props;
    return (
        <AnimatedDialog maxWidth="sm" fullWidth open={open} onClose={onClose}>
            <DialogContent sx={{ p: 0 }}>
                <Box width="100%" position="relative">
                    <IconButton
                        onClick={onClose}
                        sx={{
                            position: "absolute",
                            top: 1,
                            right: 1,
                        }}
                    >
                        <CloseIcon />
                    </IconButton>

                    <Box p={3}>
                        <Typography variant="h5" fontWeight={600} gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="body1">{description}</Typography>

                        <Box display="flex" justifyContent="flex-end" gap={2} mt={5}>
                            <Button variant="outlined" color="error" onClick={onConfirm} disabled={loading}>
                                {loading ? "Deleting..." : "Confirm"}
                            </Button>
                            <Button variant="contained" onClick={onClose} disabled={loading}>
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </DialogContent>
        </AnimatedDialog>
    );
};