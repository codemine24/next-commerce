"use client";

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Popover from "@mui/material/Popover"
import React from "react"

import { deleteBrand } from "@/actions/brand";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DeleteIcon } from "@/icons/delete-icon";
import { DotVerticalIcon } from "@/icons/dot-vertical"
import { EditIcon } from "@/icons/edit";
import { Brand } from "@/interfaces/brand";
import { toast } from "@/lib/toast-store";

import { BrandEditDialog } from "./brand-edit-dialog";

interface BrandActionPopoverProps {
    brand: Brand;
}

export const BrandActionPopover = ({ brand }: BrandActionPopoverProps) => {
    const [loading, setLoading] = React.useState(false);
    const [openConfirmModal, setOpenConfirmModal] = React.useState(false);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenConfirmModal(false);
        setOpenEditModal(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        const res = await deleteBrand([brand.id]);
        setLoading(false);
        if (res.success) {
            toast.success(res.message);
            handleClose();
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
                title="Delete Brand"
                description="Are you sure you want to delete this brand?"
                onConfirm={handleDelete}
                loading={loading}
            />}

            {openEditModal && <BrandEditDialog
                open={openEditModal}
                onClose={handleClose}
                brand={brand}
            />}
        </>
    )
}