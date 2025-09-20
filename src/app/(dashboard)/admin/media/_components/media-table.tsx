"use client";

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
import { DeleteIcon } from '@/icons/delete-icon';
import { Media } from '@/interfaces/media';
import { makeImageUrl } from '@/utils/helper';

const formatSize = (size: number) => `${(size / 1024).toFixed(2)} KB`;
const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();

export const MediaTable = ({ media }: { media: Media[] }) => {
    return (
        <TableContainer component={Paper} sx={{ border: 'none' }}>
            <Table sx={{ border: 'none' }}>
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox />
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
                        >
                            <TableCell padding="checkbox">
                                <Checkbox />
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

    );
}