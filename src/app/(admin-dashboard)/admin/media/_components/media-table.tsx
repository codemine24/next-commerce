"use client";

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

import { deleteFiles } from '@/actions/file';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';
import { OptimizeImage } from '@/components/optimize-image';
import { Pagination } from '@/components/pagination';
import { TableSelectedAction } from '@/components/table-selection-action';
import { DeleteIcon } from '@/icons/delete-icon';
import { Meta } from '@/interfaces/api';
import { Media } from '@/interfaces/media';
import { toast } from '@/lib/toast-store';
import { makeImageUrl } from '@/utils/helper';
import { formatDate, formatSize } from '@/utils/media-file';

import { MediaActionPopover } from './media-action-popover';
import { MediaDetailsSidebar } from './media-details-sidebar';

export const MediaTable = ({ media, meta }: { media: Media[]; meta: Meta }) => {
    const [openMediaDetails, setOpenMediaDetails] = React.useState(false);
    const [selectedMedia, setSelectedMedia] = React.useState<Media | null>(null);
    const [selectedRows, setSelectedRows] = React.useState<string[]>([]);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleSelectAllClick = (checked: boolean) => {
        if (checked) {
            const newSelected = media.map((n: Media) => n.path);
            setSelectedRows(newSelected);
            return;
        }
        setSelectedRows([]);
    };

    const handleSelectRow = (path: string) => {
        if (selectedRows.includes(path)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== path));
        } else {
            setSelectedRows([...selectedRows, path]);
        }
    };

    const handleDeleteMedia = async () => {
        setLoading(true);
        const res = await deleteFiles(selectedRows);
        setLoading(false);

        if (res.success) {
            setSelectedRows([]);
            toast.success(res.message);
            setOpenDeleteModal(false);
        } else {
            toast.error(res.message);
        }
    };

    const handleViewMedia = (media: Media) => {
        setSelectedMedia(media);
        setOpenMediaDetails(true);
    }

    const mediaDeleteButton = () => {
        return (
            <IconButton color="error" onClick={() => setOpenDeleteModal(true)}>
                <DeleteIcon />
            </IconButton>
        )
    }

    return (
        <Box position="relative">
            {/* Selected Table Rows */}
            <TableSelectedAction
                rowCount={media?.length}
                numSelected={selectedRows?.length}
                onSelectAllRows={handleSelectAllClick}
                action={mediaDeleteButton()}
            />

            {/* Media Table */}
            <TableContainer component={Paper} sx={{ border: 'none', borderTop: 1, borderColor: 'divider' }}>
                <Table sx={{ border: 'none' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSelectAllClick(event.target.checked)}
                                    checked={selectedRows?.length > 0 && selectedRows?.length === media?.length}
                                />
                            </TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Size</TableCell>
                            <TableCell>Format</TableCell>
                            <TableCell>Uploaded On</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {media?.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ fontWeight: 500 }}>
                                    No media found
                                </TableCell>
                            </TableRow>
                        )}
                        {media?.length > 0 && media?.map((media) => (
                            <TableRow
                                hover
                                key={media?.id}
                                selected={selectedRows.includes(media.path)}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onChange={() => handleSelectRow(media.path)}
                                        checked={selectedRows.includes(media.path)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <OptimizeImage src={makeImageUrl(media.path)} alt={media.alt_text} height={50} />
                                </TableCell>
                                <TableCell>{media.name}</TableCell>
                                <TableCell>{formatSize(media.size)}</TableCell>
                                <TableCell>{media.type.split('/')[1]}</TableCell>
                                <TableCell>{formatDate(media.created_at)}</TableCell>
                                <TableCell>
                                    <MediaActionPopover media={media} onView={handleViewMedia} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Pagination
                page={meta.page}
                total={meta.total}
                limit={meta.limit}
            />

            {openMediaDetails && <MediaDetailsSidebar
                media={selectedMedia!}
                open={openMediaDetails}
                onClose={() => setOpenMediaDetails(false)}
            />}

            {openDeleteModal && <ConfirmDialog
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                title="Delete Media"
                description="Are you sure you want to delete this media?"
                onConfirm={handleDeleteMedia}
                loading={loading}
            />}
        </Box>
    );
}