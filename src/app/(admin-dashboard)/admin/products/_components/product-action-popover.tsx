"use client";

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Popover from "@mui/material/Popover"
import Link from "next/link";
import React from "react"

import { deleteProduct } from "@/actions/product";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DeleteIcon } from "@/icons/delete-icon";
import { DotVerticalIcon } from "@/icons/dot-vertical"
import { EditIcon } from "@/icons/edit";
import { EyeIcon } from "@/icons/eye";
import { Product } from "@/interfaces/product";
import { toast } from "@/lib/toast-store";

interface ProductActionPopoverProps {
    product: Product;
}

export const ProductActionPopover = ({ product }: ProductActionPopoverProps) => {
    const [loading, startTransition] = React.useTransition();
    const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenConfirmModal(false);
    };

    const handleDelete = async () => {
        startTransition(async () => {
            const res = await deleteProduct([product.id]);
            if (res.success) {
                toast.success(res.message);
                handleClose();
            } else {
                toast.error(res.message);
            }
        });
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
                        startIcon={<EyeIcon />}
                        variant="text"
                        color="inherit"
                        component={Link}
                        href={`/${product.slug}`}
                        sx={{
                            pl: 2,
                            textTransform: "none",
                            justifyContent: "flex-start"
                        }}
                    >
                        View
                    </Button>
                    <Button
                        startIcon={<EditIcon />}
                        variant="text"
                        color="inherit"
                        component={Link}
                        href={`/admin/products/edit/${product.slug}`}
                        sx={{
                            pl: 2,
                            textTransform: "none",
                            justifyContent: "flex-start"
                        }}
                    >
                        Edit
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
                title="Delete Product"
                description="Are you sure you want to delete this product?"
                onConfirm={handleDelete}
                loading={loading}
            />}
        </>
    )
}