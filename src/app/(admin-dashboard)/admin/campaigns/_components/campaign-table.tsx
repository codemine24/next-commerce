"use client";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useState, useTransition } from 'react';

import { deleteCampaign } from '@/actions/campaign';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';
import { NotDataFound } from '@/components/not-data-found';
import { OptimizeImage } from '@/components/optimize-image';
import { Column, DataTable } from '@/components/table/data-table';
import { TableSelectedAction } from '@/components/table/table-selection-action';
import { DeleteIcon } from '@/icons/delete-icon';
import { Campaign } from '@/interfaces/campaign';
import { toast } from '@/lib/toast-store';
import { makeImageUrl } from '@/utils/helper';

import { CampaignActionPopover } from './campaign-action-popover';

interface CampaignTableProps {
    campaigns: Campaign[];
}

export const CampaignTable = ({ campaigns }: CampaignTableProps) => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, startTransition] = useTransition();

    const handleSelectAllClick = (checked: boolean) => {
        setSelectedRows(checked ? campaigns.map((m) => m.id) : []);
    };

    const handleSelectRow = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleDeleteCampaign = async () => {
        startTransition(async () => {
            const res = await deleteCampaign(selectedRows);
            if (res.success) {
                toast.success(res.message);
                setOpenDeleteModal(false);
                setSelectedRows([]);
            } else {
                toast.error(res.message);
            }
        });
    };

    const columns: Column<Campaign>[] = [
        {
            label: "Icon",
            key: "thumbnail",
            render: (row: Campaign) => (
                <OptimizeImage src={makeImageUrl(row.thumbnail)} alt={row.title} height={40} width={50} />
            )
        },
        {
            label: "Title",
            key: "title",
            render: (row: Campaign) => (
                <Box minWidth={200}>
                    <Typography variant="h6" gutterBottom>
                        {row.title}
                    </Typography>
                    <Typography variant="body2">
                        {row.sub_title}
                    </Typography>
                </Box>
            )
        },
        {
            label: "Platform",
            key: "platform",
            render: (row: Campaign) => <Typography>{row.platform || "-"}</Typography>
        },
        {
            label: "Status",
            key: "status",
            render: (row: Campaign) => <Typography>{row.status || "-"}</Typography>
        },
        {
            label: "Action",
            render: (row: Campaign) => (
                <CampaignActionPopover campaign={row} />
            ),
        },
    ]

    return (
        <Box position="relative">
            <TableSelectedAction
                rowCount={campaigns.length}
                numSelected={selectedRows.length}
                onSelectAllRows={handleSelectAllClick}
                action={
                    <IconButton color="error" onClick={() => setOpenDeleteModal(true)}>
                        <DeleteIcon />
                    </IconButton>
                }
            />
            <DataTable
                rows={campaigns}
                columns={columns}
                rowKey="id"
                emptyState={<NotDataFound hideIcon message="No campaigns found" />}
                selectedKeys={selectedRows}
                onToggleRow={handleSelectRow}
                onToggleAll={handleSelectAllClick}
                sx={{ border: 'none', borderTop: 1, borderColor: "divider" }}
            />

            {openDeleteModal && (
                <ConfirmDialog
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    title="Delete Campaign"
                    description="Are you sure you want to delete this campaign?"
                    onConfirm={handleDeleteCampaign}
                    loading={loading}
                />
            )}
        </Box>
    )
}