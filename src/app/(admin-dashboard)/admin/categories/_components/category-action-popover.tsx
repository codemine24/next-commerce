"use client";

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Popover from "@mui/material/Popover"
import { useState, useTransition } from "react"

import { deleteCategory, updateCategory } from "@/actions/category";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DeleteIcon } from "@/icons/delete-icon";
import { DotVerticalIcon } from "@/icons/dot-vertical"
import { EditIcon } from "@/icons/edit";
import { EmptyStarIcon } from "@/icons/empty-star";
import { StarIcon } from "@/icons/star";
import { Category } from "@/interfaces/category";
import { toast } from "@/lib/toast-store";

import { CategoryEditDialog } from "./category-edit-dialog";

interface CategoryActionPopoverProps {
    category: Category;
}

export const CategoryActionPopover = ({ category }: CategoryActionPopoverProps) => {
    const [loading, startTransition] = useTransition();
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [openEditModal, setOpenEditModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenConfirmModal(false);
        setOpenEditModal(false);
    };

    const handleDelete = async () => {
        startTransition(async () => {
            const res = await deleteCategory([category.id]);
            if (res.success) {
                toast.success(res.message);
                handleClose();
            } else {
                toast.error(res.message);
            }
        });
    }

    const handleToggleFeaturedCategory = async () => {
        handleClose();
        const res = await updateCategory(category.id, { featured: !category.featured });
        if (res.success) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    }

    return (
        <>
            <IconButton onClick={handleClick}>
                <DotVerticalIcon />
            </IconButton>

            <Popover
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box width={200} display="flex" flexDirection="column" p={0.5}>
                    <Button
                        startIcon={<EditIcon />}
                        variant="text"
                        color="inherit"
                        onClick={() => setOpenEditModal(true)}
                        sx={{
                            pl: 2,
                            textTransform: "none",
                            justifyContent: "flex-start"
                        }}
                    >
                        Edit
                    </Button>

                    <Button
                        startIcon={category.featured ? <EmptyStarIcon /> : <StarIcon />}
                        variant="text"
                        color="inherit"
                        onClick={handleToggleFeaturedCategory}
                        sx={{
                            pl: 2,
                            textTransform: "none",
                            justifyContent: "flex-start"
                        }}
                    >
                        {category.featured ? "Remove featured" : "Make featured"}
                    </Button>

                    {/* Delete Button */}
                    <Button
                        startIcon={<DeleteIcon />}
                        variant="text"
                        color="error"
                        onClick={() => setOpenConfirmModal(true)}
                        sx={{
                            pl: 2,
                            textTransform: "none",
                            justifyContent: "flex-start"
                        }}
                    >
                        Delete
                    </Button>
                </Box>
            </Popover>

            {openConfirmModal && <ConfirmDialog
                open={openConfirmModal}
                onClose={handleClose}
                title="Delete Category"
                description="Are you sure you want to delete this category?"
                onConfirm={handleDelete}
                loading={loading}
            />}

            {openEditModal && <CategoryEditDialog
                open={openEditModal}
                onClose={handleClose}
                category={category}
            />}
        </>
    )
}