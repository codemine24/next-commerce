"use client";

import Box from "@mui/material/Box";
import React from 'react';

import { Media } from '@/interfaces/media';

import { MediaFilter } from './media-filter';
import { MediaTable } from './media-table';
import { MediaTabs } from './media-tabs';

export const MediaContent = ({ media }: { media: Media[] }) => {
    return (
        <Box bgcolor="background.default" border={1} borderColor="divider">
            <MediaTabs />
            <MediaFilter />
            <MediaTable media={media} />
        </Box>
    );
}