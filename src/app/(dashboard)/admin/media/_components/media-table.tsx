"use client";

import { Box } from '@mui/material';
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

import { OptimizeImage } from '@/components/optimize-image';
import { TableSelectedAction } from '@/components/table-selection-action';
import { DeleteIcon } from '@/icons/delete-icon';
import { Media } from '@/interfaces/media';
import { makeImageUrl } from '@/utils/helper';

const formatSize = (size: number) => `${(size / 1024).toFixed(2)} KB`;
const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();

export const MediaTable = ({ media }: { media: Media[] }) => {
    const [selectedRows, setSelectedRows] = React.useState<string[]>([]);

    const handleSelectAllClick = (checked: boolean) => {
        if (checked) {
            const newSelected = media.map((n: Media) => n.id);
            setSelectedRows(newSelected);
            return;
        }
        setSelectedRows([]);
    };

    const handleSelectRow = (id: string) => {
        if (selectedRows.includes(id)) {
            setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
        } else {
            setSelectedRows([...selectedRows, id]);
        }
    };

    return (
        <Box position="relative">
            {/* Selected Table Rows */}
            <TableSelectedAction
                rowCount={media.length}
                numSelected={selectedRows.length}
                onSelectAllRows={handleSelectAllClick}
            />

            {/* Media Table */}
            <TableContainer component={Paper} sx={{ border: 'none' }}>
                <Table sx={{ border: 'none' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => handleSelectAllClick(event.target.checked)}
                                    checked={selectedRows.length === media.length}
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
                        {media?.map((media) => (
                            <TableRow
                                hover
                                key={media.id}
                                selected={selectedRows.includes(media.id)}
                            >
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onChange={() => handleSelectRow(media.id)}
                                        checked={selectedRows.includes(media.id)}
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
                                    <IconButton color="error" onClick={() => alert(`Delete ${media.id}`)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}