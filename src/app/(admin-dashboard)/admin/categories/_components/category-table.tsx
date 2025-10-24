"use client";

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DOMPurify from 'isomorphic-dompurify';
import { useState, useTransition } from 'react';

import { deleteCategory } from '@/actions/category';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';
import { NotDataFound } from '@/components/not-data-found';
import { OptimizeImage } from '@/components/optimize-image';
import { Column, DataTable } from '@/components/table/data-table';
import { TableSelectedAction } from '@/components/table/table-selection-action';
import { DeleteIcon } from '@/icons/delete-icon';
import { Category } from '@/interfaces/category';
import { toast } from '@/lib/toast-store';
import { makeImageUrl } from '@/utils/helper';

import { CategoryActionPopover } from './category-action-popover';

interface CategoryTableProps {
    categories: Category[];
}

export const CategoryTable = ({ categories }: CategoryTableProps) => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, startTransition] = useTransition();

    const handleSelectAllClick = (checked: boolean) => {
        setSelectedRows(checked ? categories.map((m) => m.id) : []);
    };

    const handleSelectRow = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleDeleteCategory = async () => {
        startTransition(async () => {
            const res = await deleteCategory(selectedRows);
            if (res.success) {
                setSelectedRows([]);
                setOpenDeleteModal(false);
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    };

    const columns: Column<Category>[] = [
        {
            label: "Icon",
            key: "icon",
            render: (row: Category) => (
                <OptimizeImage src={makeImageUrl(row.icon)} alt={row.title} height={40} width={50} />
            )
        },
        {
            label: "Title",
            key: "title",
            render: (row: Category) => (
                <Box minWidth={200}>
                    <Typography variant="h6">
                        {row.title}
                    </Typography>
                    <Box
                        component="div"
                        mt={1}
                        fontSize={13}
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(row.description || '') }}
                    />
                </Box>
            )
        },
        {
            label: "Featured",
            key: "featured",
            render: (row: Category) => row.featured && <Chip label="Featured" variant="outlined" color="primary" />
        },
        {
            label: "Parent",
            key: "parent",
            render: (row: Category) => <Typography>{row.parent?.title || "-"}</Typography>
        },
        {
            label: "Action",
            render: (row: Category) => (
                <CategoryActionPopover category={row} />
            ),
        },
    ]

    return (
        <Box position="relative">
            <TableSelectedAction
                rowCount={categories.length}
                numSelected={selectedRows.length}
                onSelectAllRows={handleSelectAllClick}
                action={
                    <IconButton color="error" onClick={() => setOpenDeleteModal(true)}>
                        <DeleteIcon />
                    </IconButton>
                }
            />
            <DataTable
                rows={categories}
                columns={columns}
                rowKey="id"
                emptyState={<NotDataFound hideIcon message="No categories found" />}
                selectedKeys={selectedRows}
                onToggleRow={handleSelectRow}
                onToggleAll={handleSelectAllClick}
                sx={{ border: 'none', borderTop: 1, borderColor: "divider" }}
            />

            {openDeleteModal && (
                <ConfirmDialog
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    title="Delete Category"
                    description="Are you sure you want to delete this category?"
                    onConfirm={handleDeleteCategory}
                    loading={loading}
                />
            )}
        </Box>
    )
}