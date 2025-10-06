"use client";

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Popover from "@mui/material/Popover"
import { useState, useTransition } from "react"

import { deleteAttribute } from "@/actions/attribute";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DeleteIcon } from "@/icons/delete-icon";
import { DotVerticalIcon } from "@/icons/dot-vertical"
import { EditIcon } from "@/icons/edit";
import { Attribute } from "@/interfaces/attribute";
import { toast } from "@/lib/toast-store";
import { AttributeEditDialog } from "./attribute-edit-dialog";

interface AttributeActionPopoverProps {
    attribute: Attribute;
}

export const AttributeActionPopover = ({ attribute }: AttributeActionPopoverProps) => {
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
            const res = await deleteAttribute([attribute.id]);
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
                title="Delete Attribute"
                description="Are you sure you want to delete this attribute?"
                onConfirm={handleDelete}
                loading={loading}
            />}


            {openEditModal && <AttributeEditDialog
                open={openEditModal}
                onClose={handleClose}
                attribute={attribute}
            />}
        </>
    )
}