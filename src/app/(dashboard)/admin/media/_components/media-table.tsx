"use client";

import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

import { OptimizeImage } from '@/components/optimize-image';
import { Media } from '@/interfaces/media';
import { makeImageUrl } from '@/utils/helper';

const formatSize = (size: number) => `${(size / 1024).toFixed(2)} KB`;
const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString();

const defaultStyles = {
    py: 2,
    fontSize: 14,
    borderTop: 'solid 1px',
    borderColor: 'divider',
    '&:first-of-type': {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        borderLeft: 'solid 1px',
        borderColor: 'divider',
    },
    '&:last-of-type': {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        borderRight: 'solid 1px',
        borderColor: 'divider',
    },
};

export const MediaTable = ({ media }: { media: Media[] }) => {
    return (
        <TableContainer component={Paper} sx={{ border: 'none' }}>
            <Table sx={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
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
                    {media.map((media) => (
                        <TableRow
                            key={media.id}
                            sx={{
                                [`& .${tableCellClasses.root}`]: { ...defaultStyles },
                            }}
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
                                    {/* <DeleteIcon /> */}
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    );
}