"use client";

import React, { use } from 'react';

import { getFiles } from '@/actions/file';
import { ErrorComponent } from '@/components/error';
import { SearchParams } from '@/interfaces/common';

import { MediaTable } from './media-table';

export const MediaContent = ({ searchParams }: { searchParams: Promise<SearchParams> }) => {
    const query = use(searchParams);
    const data = use(getFiles(query));

    if (!data.success) {
        return <ErrorComponent />
    }

    return (
        <MediaTable media={data.data} meta={data.meta} />
    );
}