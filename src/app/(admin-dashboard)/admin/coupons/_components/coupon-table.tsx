"use client";

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import { useState, useTransition } from 'react';

import { deleteCoupon } from '@/actions/coupon';
import { ConfirmDialog } from '@/components/dialog/confirm-dialog';
import { NotDataFound } from '@/components/not-data-found';
import { Column, DataTable } from '@/components/table/data-table';
import { TableSelectedAction } from '@/components/table/table-selection-action';
import { DeleteIcon } from '@/icons/delete-icon';
import { Coupon } from '@/interfaces/coupon';
import { toast } from '@/lib/toast-store';

import { CouponActionPopover } from './coupon-action-popover';

interface CouponTableProps {
    coupons: Coupon[];
}

export const CouponTable = ({ coupons }: CouponTableProps) => {
    const [selectedRows, setSelectedRows] = useState<string[]>([]);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading, startTransition] = useTransition();

    const handleSelectAllClick = (checked: boolean) => {
        setSelectedRows(checked ? coupons.map((m) => m.id) : []);
    };

    const handleSelectRow = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleDeleteCoupon = async () => {
        startTransition(async () => {
            const res = await deleteCoupon(selectedRows);
            if (res.success) {
                setSelectedRows([]);
                setOpenDeleteModal(false);
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    };

    const columns: Column<Coupon>[] = [
        {
            label: "Code",
            key: "code",
        },
        {
            label: "Discount Type",
            key: "discount_type",
        },
        {
            label: "Discount Amount",
            key: "discount_value",
        },
        {
            label: "Start Date",
            key: "start_date",
            render: (row: Coupon) => dayjs(row.start_date).format("YYYY-MM-DD"),
        },
        {
            label: "Expiration Date",
            key: "expiration_date",
            render: (row: Coupon) => dayjs(row.expiration_date).format("YYYY-MM-DD"),
        },
        {
            label: "Beneficiary Type",
            key: "beneficiary_type",
        },
        {
            label: "Status",
            key: "is_active",
            render: (row: Coupon) => (
                <Chip
                    label={row.is_active ? "Active" : "Inactive"}
                    color={row.is_active ? "primary" : "error"}
                />
            ),
        },
        {
            label: "Action",
            render: (row: Coupon) => (
                <CouponActionPopover coupon={row} />
            ),
        },
    ]

    return (
        <Box position="relative">
            <TableSelectedAction
                rowCount={coupons.length}
                numSelected={selectedRows.length}
                onSelectAllRows={handleSelectAllClick}
                action={
                    <IconButton color="error" onClick={() => setOpenDeleteModal(true)}>
                        <DeleteIcon />
                    </IconButton>
                }
            />
            <DataTable
                rows={coupons}
                columns={columns}
                rowKey="id"
                emptyState={<NotDataFound hideIcon message="No coupons found" />}
                selectedKeys={selectedRows}
                onToggleRow={handleSelectRow}
                onToggleAll={handleSelectAllClick}
                sx={{ border: 'none', borderTop: 1, borderColor: "divider" }}
            />

            {openDeleteModal && (
                <ConfirmDialog
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    title="Delete Coupon"
                    description="Are you sure you want to delete this coupon?"
                    onConfirm={handleDeleteCoupon}
                    loading={loading}
                />
            )}
        </Box>
    )
}