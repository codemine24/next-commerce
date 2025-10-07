"use client";

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import Popover from "@mui/material/Popover"
import Link from "next/link";
import { useState, useTransition } from "react"

import { deleteCampaign } from "@/actions/campaign";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { DeleteIcon } from "@/icons/delete-icon";
import { DotVerticalIcon } from "@/icons/dot-vertical"
import { EditIcon } from "@/icons/edit";
import { Campaign } from "@/interfaces/campaign";
import { toast } from "@/lib/toast-store";

interface CampaignActionPopoverProps {
    campaign: Campaign;
}

export const CampaignActionPopover = ({ campaign }: CampaignActionPopoverProps) => {
    const [loading, startTransition] = useTransition();
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setOpenConfirmModal(false);
    };

    const handleDelete = async () => {
        startTransition(async () => {
            const res = await deleteCampaign([campaign.id]);
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
                        component={Link}
                        href={`/admin/campaigns/edit/${campaign.id}`}
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
                title="Delete Campaign"
                description="Are you sure you want to delete this campaign?"
                onConfirm={handleDelete}
                loading={loading}
            />}
        </>
    )
}