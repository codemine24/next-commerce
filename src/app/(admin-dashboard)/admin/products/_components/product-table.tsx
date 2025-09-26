"use client";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTransition, useState } from 'react';

import { deleteProduct } from '@/actions/product';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';
import { NotDataFound } from '@/components/not-data-found';
import { OptimizeImage } from '@/components/optimize-image';
import { Column, DataTable } from '@/components/table/data-table';
import { TableSelectedAction } from '@/components/table/table-selection-action';
import { DeleteIcon } from '@/icons/delete-icon';
import { Product } from '@/interfaces/product';
import { toast } from '@/lib/toast-store';
import { currencyFormatter } from '@/utils/currency-formatter';
import { makeImageUrl } from '@/utils/helper';

import { ProductActionPopover } from './product-action-popover';

interface ProductTableProps {
    products: Product[];
}

export const ProductTable = ({ products }: ProductTableProps) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, startTransition] = useTransition();
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const handleSelectAllClick = (checked: boolean) => {
        setSelectedRows(checked ? products.map((p) => p.id) : []);
    };

    const handleSelectRow = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleDeleteProduct = async () => {
        startTransition(async () => {
            const res = await deleteProduct(selectedRows);
            if (res.success) {
                setSelectedRows([]);
                setOpenDeleteModal(false);
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    };

    const columns: Column<Product>[] = [
        {
            label: "Image",
            key: "thumbnail",
            render: (row: Product) => (
                <OptimizeImage src={makeImageUrl(row.thumbnail)} alt={row.name} height={40} width={50} />
            )
        },
        {
            label: "Name",
            key: "name",
            render: (row: Product) => (
                <Box minWidth={200}>
                    <Typography variant="h6">
                        {row.name}
                    </Typography>
                </Box>
            )
        },
        {
            label: "Price",
            key: "price",
            render: (row: Product) => currencyFormatter(row.price)
        },
        {
            label: "Discount Price",
            key: "discount_price",
            render: (row: Product) => row.discount_price ? currencyFormatter(row.discount_price) : '-'
        },
        {
            label: "Action",
            render: (row: Product) => (
                <ProductActionPopover product={row} />
            )
        }
    ]

    return (
        <Box position="relative">
            <TableSelectedAction
                rowCount={products.length}
                numSelected={selectedRows.length}
                onSelectAllRows={handleSelectAllClick}
                action={
                    <IconButton color="error" onClick={() => setOpenDeleteModal(true)}>
                        <DeleteIcon />
                    </IconButton>
                }
            />
            <DataTable
                rows={products}
                columns={columns}
                rowKey="id"
                emptyState={<NotDataFound hideIcon message="No products found" />}
                selectedKeys={selectedRows}
                onToggleRow={handleSelectRow}
                onToggleAll={handleSelectAllClick}
                sx={{ border: 'none', borderTop: 1, borderColor: "divider" }}
            />

            {openDeleteModal && (
                <ConfirmDialog
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    title="Delete Product"
                    description="Are you sure you want to delete this product?"
                    onConfirm={handleDeleteProduct}
                    loading={loading}
                />
            )}
        </Box>
    )
}