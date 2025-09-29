"use client";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DOMPurify from 'isomorphic-dompurify';
import { useState, useTransition } from 'react';

import { deleteBrand } from '@/actions/brand';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';
import { NotDataFound } from '@/components/not-data-found';
import { OptimizeImage } from '@/components/optimize-image';
import { Column, DataTable } from '@/components/table/data-table';
import { TableSelectedAction } from '@/components/table/table-selection-action';
import { DeleteIcon } from '@/icons/delete-icon';
import { Brand } from '@/interfaces/brand';
import { toast } from '@/lib/toast-store';
import { makeImageUrl } from '@/utils/helper';

import { BrandActionPopover } from './brand-action-popover';

interface BrandTableProps {
    brands: Brand[];
}

export const BrandTable = ({ brands }: BrandTableProps) => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, startTransition] = useTransition();

    const handleSelectAllClick = (checked: boolean) => {
        setSelectedRows(checked ? brands.map((m) => m.id) : []);
    };

    const handleSelectRow = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleDeleteBrand = async () => {
        startTransition(async () => {
            const res = await deleteBrand(selectedRows);
            if (res.success) {
                setSelectedRows([]);
                setOpenDeleteModal(false);
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    };

    const columns: Column<Brand>[] = [
        {
            label: "Icon",
            key: "icon",
            render: (row: Brand) => (
                <OptimizeImage src={makeImageUrl(row.icon)} alt={row.name} height={40} width={50} />
            )
        },
        {
            label: "Name",
            key: "name",
            render: (row: Brand) => (
                <Box minWidth={200}>
                    <Typography variant="h6">
                        {row.name}
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
            label: "Code",
            key: "code"
        },
        {
            label: "Action",
            render: (row: Brand) => (
                <BrandActionPopover brand={row} />
            ),
        },
    ]

    return (
        <Box position="relative">
            <TableSelectedAction
                rowCount={brands.length}
                numSelected={selectedRows.length}
                onSelectAllRows={handleSelectAllClick}
                action={
                    <IconButton color="error" onClick={() => setOpenDeleteModal(true)}>
                        <DeleteIcon />
                    </IconButton>
                }
            />
            <DataTable
                rows={brands}
                columns={columns}
                rowKey="id"
                emptyState={<NotDataFound hideIcon message="No brands found" />}
                selectedKeys={selectedRows}
                onToggleRow={handleSelectRow}
                onToggleAll={handleSelectAllClick}
                sx={{ border: 'none', borderTop: 1, borderColor: "divider" }}
            />

            {openDeleteModal && (
                <ConfirmDialog
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    title="Delete Brand"
                    description="Are you sure you want to delete this brand?"
                    onConfirm={handleDeleteBrand}
                    loading={loading}
                />
            )}
        </Box>
    )
}