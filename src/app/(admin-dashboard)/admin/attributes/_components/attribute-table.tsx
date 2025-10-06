"use client";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useState, useTransition } from "react";

import { deleteAttribute } from "@/actions/attribute";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { NotDataFound } from "@/components/not-data-found";
import { Column, DataTable } from "@/components/table/data-table";
import { TableSelectedAction } from "@/components/table/table-selection-action";
import { DeleteIcon } from "@/icons/delete-icon";
import { Attribute } from "@/interfaces/attribute";
import { toast } from "@/lib/toast-store";

import { AttributeActionPopover } from "./attribute-action-popover";

interface AttributeTableProps {
  attributes: Attribute[];
}

export const AttributeTable = ({ attributes }: AttributeTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [loading, startTransition] = useTransition();

  const handleSelectAllClick = (checked: boolean) => {
    setSelectedRows(checked ? attributes.map((m) => m.id) : []);
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleDeleteAttribute = async () => {
    startTransition(async () => {
      const res = await deleteAttribute(selectedRows);
      if (res.success) {
        setSelectedRows([]);
        setOpenDeleteModal(false);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  const columns: Column<Attribute>[] = [
    {
      label: "Title",
      key: "name",
    },
    {
      label: "Values",
      key: "attribute_values",
      render: (attribute) => attribute?.attribute_values?.map((value) => value.title).join(", ")
    },
    {
      label: "Type",
      key: "type",
    },
    {
      label: "Category",
      key: "category",
      render: (attribute) => attribute?.category?.title,
    },
    {
      label: "Action",
      render: (attribute) => (
        <AttributeActionPopover attribute={attribute} />
      ),
    },
  ];

  return (
    <Box position="relative">
      <TableSelectedAction
        rowCount={attributes.length}
        numSelected={selectedRows.length}
        onSelectAllRows={handleSelectAllClick}
        action={
          <IconButton color="error" onClick={() => setOpenDeleteModal(true)}>
            <DeleteIcon />
          </IconButton>
        }
      />
      <DataTable
        rows={attributes}
        columns={columns}
        rowKey="id"
        emptyState={<NotDataFound hideIcon message="No attributes found" />}
        selectedKeys={selectedRows}
        onToggleRow={handleSelectRow}
        onToggleAll={handleSelectAllClick}
        sx={{ border: "none", borderTop: 1, borderColor: "divider" }}
      />

      {openDeleteModal && (
        <ConfirmDialog
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          title="Delete Attribute"
          description="Are you sure you want to delete this attribute?"
          onConfirm={handleDeleteAttribute}
          loading={loading}
        />
      )}
    </Box>
  );
};
