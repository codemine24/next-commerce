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

import { updateCategory } from "@/actions/category";
import { AnimatedDialog } from "@/components/dialog/animate-dialog";
import { SubmitButton } from "@/components/submit-button";
import { useFetch } from "@/hooks/use-fetch";
import { CloseIcon } from "@/icons/close";
import { Category } from "@/interfaces/category";
import { API_ROUTES } from "@/lib/api-routes";
import { toast } from "@/lib/toast-store";
import { categorySchema, CategorySchema } from "@/zod/category-schema";

import { CategoryForm } from "./category-form";

interface CategoryEditDialogProps {
    open: boolean;
    onClose: () => void;
    category: Category;
}

export const CategoryEditDialog = ({ open, onClose, category }: CategoryEditDialogProps) => {
    const { data } = useFetch(API_ROUTES.categories.get_categories);

    const methods = useForm<CategorySchema>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            title: category.title,
            code: category.code,
            description: category.description,
            parent_id: category.parent_id,
            icon: category.icon,
        },
    });

    const onSubmit = async (data: CategorySchema) => {
        const res = await updateCategory(category.id, data);

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
            title="Edit Category"
            maxWidth="md"
            fullWidth
            sx={{ overflowX: "hidden" }}
        >
            <IconButton onClick={onClose} sx={{ position: "absolute", right: 8, top: 8 }}>
                <CloseIcon />
            </IconButton>
            <DialogTitle>
                <Typography variant="h4">Edit Category</Typography>
            </DialogTitle>

            <DialogContent sx={{ borderTop: 1, borderBottom: 1, borderColor: "divider" }}>
                <Box pt={2}>
                    <CategoryForm
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