"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

import { AnimatedDialog } from "@/components/dialog/animate-dialog";
import { SubmitButton } from "@/components/submit-button";
import { CloseIcon } from "@/icons/close";
import { User } from "@/interfaces/user";
import { signupSchema, SignupSchemaType } from "@/zod/signup-schema";

interface UserEditDialogProps {
    open: boolean;
    onClose: () => void;
    user: User;
}

export const UserEditDialog = ({ open, onClose, user }: UserEditDialogProps) => {
    const methods = useForm<SignupSchemaType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email || "",
            contact_number: user.contact_number || "",
        },
    });

    return (
        <AnimatedDialog
            open={open}
            onClose={onClose}
            title="Edit Brand"
            maxWidth="md"
            fullWidth
            sx={{ overflowX: "hidden" }}
        >
            <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
                <CloseIcon />
            </IconButton>
            <DialogTitle>
                <Typography variant="h4">Edit Brand</Typography>
            </DialogTitle>

            <DialogContent sx={{ borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
                <Box pt={2}>
                    {/* <SignupForm
                        methods={methods}
                        onSubmit={onSubmit}
                        hideActionButtons
                    /> */}
                </Box>
            </DialogContent>

            <DialogActions>
                <Button
                    variant="outlined"
                    onClick={onClose}
                    disabled={methods.formState.isSubmitting}
                >
                    Cancel
                </Button>

                <SubmitButton
                    label="Save"
                    loadingLabel="Saving..."
                    variant="contained"
                    disabled={methods.formState.isSubmitting}
                    isLoading={methods.formState.isSubmitting}
                    sx={{ height: "auto" }}
                    onClick={methods.handleSubmit(() => { })}
                />
            </DialogActions>
        </AnimatedDialog>
    )
}