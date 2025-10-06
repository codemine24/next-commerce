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

import { updateAttribute } from "@/actions/attribute";
import { AnimatedDialog } from "@/components/dialog/animate-dialog";
import { SubmitButton } from "@/components/submit-button";
import { useFetch } from "@/hooks/use-fetch";
import { CloseIcon } from "@/icons/close";
import { Attribute } from "@/interfaces/attribute";
import { API_ROUTES } from "@/lib/api-routes";
import { toast } from "@/lib/toast-store";
import { attributeSchema, AttributeSchema } from "@/zod/attribute-schema";

import { AttributeForm } from "./attribute-form";

interface AttributeEditDialogProps {
    open: boolean;
    onClose: () => void;
    attribute: Attribute;
}

export const AttributeEditDialog = ({ open, onClose, attribute }: AttributeEditDialogProps) => {
    const { data } = useFetch(API_ROUTES.categories.get_categories);

    const methods = useForm<AttributeSchema>({
        resolver: zodResolver(attributeSchema),
        defaultValues: {
            name: attribute.name,
            type: attribute.type,
            category_id: attribute.category?.id,
            attribute_values: attribute.attribute_values.map(value => value.title),
        },
    });

    const onSubmit = async (data: AttributeSchema) => {
        const res = await updateAttribute(attribute.id, data);

        if (res.success) {
            toast.success(res.message);
            onClose();
        } else {
            toast.error(res.message);
        }
    }

    return (
        <AnimatedDialog
            open={open}
            onClose={onClose}
            title="Edit Attribute"
            maxWidth="md"
            fullWidth
            sx={{ overflowX: "hidden" }}
        >
            <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
                <CloseIcon />
            </IconButton>
            <DialogTitle>
                <Typography variant="h4">Edit Attribute</Typography>
            </DialogTitle>

            <DialogContent sx={{ borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
                <Box pt={2}>
                    <AttributeForm
                        methods={methods}
                        onSubmit={onSubmit}
                        categories={data || []}
                        hideActionButtons
                    />
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
                    onClick={methods.handleSubmit(onSubmit)}
                />
            </DialogActions>
        </AnimatedDialog>
    )
}