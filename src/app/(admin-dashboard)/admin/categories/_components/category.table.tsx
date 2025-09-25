"use client";

import { Column, DataTable } from '@/components/data-table';
import { NotDataFound } from '@/components/not-data-found';
import { Category } from '@/interfaces/category';
import { makeImageUrl } from '@/utils/helper';
import { OptimizeImage } from '@/components/optimize-image';

interface CategoryTableProps {
    categories: Category[];
}

export const CategoryTable = ({ categories }: CategoryTableProps) => {
    const columns: Column<Category>[] = [
        {
            label: "Icon",
            key: "icon",
            render: (row: Category) => (
                <OptimizeImage src={makeImageUrl(row.icon)} alt={row.title} height={50} />
            )
        },
        {
            label: "Title",
            key: "title"
        },
        {
            label: "Code",
            key: "code"
        },
        {
            label: "Featured",
            key: "featured"
        },
        {
            label: "Description",
            key: "description"
        },
        {
            label: "Action",
        }
    ]

    return (
        <DataTable
            rows={categories}
            columns={columns}
            rowKey="id"
            emptyState={<NotDataFound hideIcon message="No categories found" />}
            sx={{ border: "none", borderTop: 1, borderColor: "divider" }}
        />
    )
}