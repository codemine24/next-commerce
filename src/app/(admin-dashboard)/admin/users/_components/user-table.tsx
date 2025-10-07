"use client";

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTransition, useState } from 'react';

import { ConfirmDialog } from '@/components/dialog/confirm-dialog';
import { NotDataFound } from '@/components/not-data-found';
import { OptimizeImage } from '@/components/optimize-image';
import { Column, DataTable } from '@/components/table/data-table';
import { TableSelectedAction } from '@/components/table/table-selection-action';
import { DeleteIcon } from '@/icons/delete-icon';
import { User } from '@/interfaces/user';
import { makeImageUrl } from '@/utils/helper';

import { UserActionPopover } from './user-action-popover';

interface UserTableProps {
    users: User[];
}

export const UserTable = ({ users }: UserTableProps) => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [loading] = useTransition();
    const [selectedRows, setSelectedRows] = useState<string[]>([]);

    const handleSelectAllClick = (checked: boolean) => {
        setSelectedRows(checked ? users.map((u) => u.id) : []);
    };

    const handleSelectRow = (id: string) => {
        setSelectedRows((prev) =>
            prev.includes(id) ? prev.filter((u) => u !== id) : [...prev, id]
        );
    };

    const handleDeleteUser = async () => {
        // startTransition(async () => {
        //     const res = await deleteProduct(selectedRows);
        //     if (res.success) {
        //         setSelectedRows([]);
        //         setOpenDeleteModal(false);
        //         toast.success(res.message);
        //     } else {
        //         toast.error(res.message);
        //     }
        // });
    };

    const columns: Column<User>[] = [
        {
            label: "Image",
            key: "avatar",
            render: (row: User) => (
                <OptimizeImage src={makeImageUrl(row.avatar)} alt={row.first_name} height={40} width={50} />
            )
        },
        {
            label: "Name",
            key: "first_name",
            render: (row: User) => (
                <Box minWidth={200}>
                    <Typography variant="h6">
                        {row.first_name} {row.last_name}
                    </Typography>
                </Box>
            )
        },
        {
            label: "Email",
            key: "email",
            render: (row: User) => row.email
        },
        {
            label: "Role",
            key: "role",
            render: (row: User) => row.role
        },
        {
            label: "Action",
            render: (row: User) => (
                <UserActionPopover user={row} />
            )
        }
    ]

    return (
        <Box position="relative">
            <TableSelectedAction
                rowCount={users.length}
                numSelected={selectedRows.length}
                onSelectAllRows={handleSelectAllClick}
                action={
                    <IconButton color="error" onClick={() => setOpenDeleteModal(true)}>
                        <DeleteIcon />
                    </IconButton>
                }
            />
            <DataTable
                rows={users}
                columns={columns}
                rowKey="id"
                emptyState={<NotDataFound hideIcon message="No users found" />}
                selectedKeys={selectedRows}
                onToggleRow={handleSelectRow}
                onToggleAll={handleSelectAllClick}
                sx={{ border: 'none', borderTop: 1, borderColor: "divider" }}
            />

            {openDeleteModal && (
                <ConfirmDialog
                    open={openDeleteModal}
                    onClose={() => setOpenDeleteModal(false)}
                    title="Delete User"
                    description="Are you sure you want to delete this user?"
                    onConfirm={handleDeleteUser}
                    loading={loading}
                />
            )}
        </Box>
    )
}