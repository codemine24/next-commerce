import { Box, Typography } from '@mui/material';
import React, { use } from 'react';

import { getFiles } from '@/actions/file';
import { SearchParams } from '@/interfaces/common';

import { MediaTable } from './media-table';

export const MediaContent = ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
    const query = use(searchParams);
    const data = use(getFiles(query));

    if (!data.success) {
        return (
            <Box>
                <Typography variant="h6">No media found</Typography>
            </Box>
        )
    }

    return (
        <MediaTable media={data.data} meta={data.meta} />
    );
}