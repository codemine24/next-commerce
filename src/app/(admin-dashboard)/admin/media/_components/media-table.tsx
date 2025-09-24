"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import React from "react";

import { deleteFiles } from "@/actions/file";
import { Column, DataTable } from "@/components/data-table";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { NotDataFound } from "@/components/not-data-found";
import { OptimizeImage } from "@/components/optimize-image";
import { TableSelectedAction } from "@/components/table-selection-action";
import { DeleteIcon } from "@/icons/delete-icon";
import { Media } from "@/interfaces/media";
import { toast } from "@/lib/toast-store";
import { makeImageUrl } from "@/utils/helper";
import { formatDate, formatSize } from "@/utils/media-file";

import { MediaActionPopover } from "./media-action-popover";
import { MediaDetailsSidebar } from "./media-details-sidebar";

export const MediaTable = ({ media }: { media: Media[] }) => {
    const [openMediaDetails, setOpenMediaDetails] = React.useState(false);
    const [selectedMedia, setSelectedMedia] = React.useState<Media | null>(null);
    const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleSelectAllClick = (checked: boolean) => {
        setSelectedRows(checked ? media.map((m) => m.path) : []);
    };

    const handleSelectRow = (path: string) => {
        setSelectedRows((prev) =>
            prev.includes(path) ? prev.filter((p) => p !== path) : [...prev, path]
        );
    };

    const handleDeleteMedia = async () => {
        setLoading(true);
        const res = await deleteFiles(selectedRows);
        setLoading(false);

        if (res.success) {
            setSelectedRows([]);
            setOpenDeleteModal(false);
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };

    const handleViewMedia = (m: Media) => {
        setSelectedMedia(m);
        setOpenMediaDetails(true);
    };

    const columns: Column<Media>[] = [
        {
            label: "Image",
            render: (m) => (
                <OptimizeImage src={makeImageUrl(m.path)} alt={m.alt_text} height={50} />
            ),
        },
        { label: "Name", key: "name" },
        { label: "Size", render: (m) => formatSize(m.size) },
        { label: "Format", render: (m) => m.type.split("/")[1] },
        { label: "Uploaded On", render: (m) => formatDate(m.created_at) },
        {
            label: "Action",
            render: (m) => (
                <MediaActionPopover media={m} onView={() => handleViewMedia(m)} />
            ),
        },
    ];

    return (
        <Box position="relative">
            <TableSelectedAction
                rowCount={media.length}
                numSelected={selectedRows.length}
                onSelectAllRows={handleSelectAllClick}
                action={
                    <IconButton color="error" onClick={() => setOpenDeleteModal(true)}>
                        <DeleteIcon />
                    </IconButton>
                }
            />

            <DataTable
                rows={media}
                columns={columns}
                rowKey="path"
                selectedKeys={selectedRows}
                onToggleRow={handleSelectRow}
                onToggleAll={handleSelectAllClick}
                emptyState={<NotDataFound message="No media found" />}
                sx={{ border: "none", borderTop: 1, borderColor: "divider" }}
            />

            {openMediaDetails && (
                <MediaDetailsSidebar
                    media={selectedMedia!}
                    open={openMediaDetails}
                    onClose={() => setOpenMediaDetails(false)}
                />
            )}

            {openDeleteModal && (
                <ConfirmDialog
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    title="Delete Media"
                    description="Are you sure you want to delete this media?"
                    onConfirm={handleDeleteMedia}
                    loading={loading}
                />
            )}
        </Box>
    );
};
