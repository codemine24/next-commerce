"use client";

import Box from "@mui/material/Box";
import React from 'react';

import { Media } from '@/interfaces/media';

import { MediaTable } from './media-table';

export const MediaContent = ({ media }: { media: Media[] }) => {
    return (
        <Box>
            <MediaTable media={media} />
        </Box>
    );
}