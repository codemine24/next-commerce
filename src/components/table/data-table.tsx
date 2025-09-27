"use client";

import { SxProps } from "@mui/material";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

export interface Column<T> {
    label: string;
    key?: keyof T;
    render?: (row: T) => React.ReactNode;
    cellProps?: React.ComponentProps<typeof TableCell>;
}

interface DataTableProps<T> {
    rows: T[];
    columns: Column<T>[];
    selectedKeys?: string[];
    rowKey: keyof T;
    onToggleRow?: (key: string) => void;
    onToggleAll?: (checked: boolean) => void;
    emptyState?: React.ReactNode;
    sx?: SxProps;
}

export const DataTable = <T extends Record<string, any>>(props: DataTableProps<T>) => {
    const { rows, columns, selectedKeys = [], rowKey, onToggleRow, onToggleAll, emptyState, sx } = props;

    const allSelected = rows.length > 0 && selectedKeys.length === rows.length;

    return (
        <Box minWidth={"100%"} overflow="auto">
            <TableContainer>
                <Table sx={sx}>
                    <TableHead>
                        <TableRow>
                            {onToggleRow && (
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        onChange={(e) => onToggleAll?.(e.target.checked)}
                                        checked={allSelected}
                                    />
                                </TableCell>
                            )}
                            {columns.map((col) => (
                                <TableCell key={col.label} {...col.cellProps}>
                                    {col.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {rows.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={columns.length + (onToggleRow ? 1 : 0)}>
                                    {emptyState}
                                </TableCell>
                            </TableRow>
                        )}

                        {rows.map((row) => {
                            const key = String(row[rowKey]);
                            const isSelected = selectedKeys.includes(key);

                            return (
                                <TableRow key={key} hover selected={isSelected}>
                                    {onToggleRow && (
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={isSelected}
                                                onChange={() => onToggleRow?.(key)}
                                            />
                                        </TableCell>
                                    )}
                                    {columns.map((col) => (
                                        <TableCell key={col.label} {...col.cellProps}>
                                            {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "")}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
