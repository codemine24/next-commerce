"use client";

import { Box, IconButton, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useState, useTransition } from "react";

import { deleteQnas } from "@/actions/qna";
import { ConfirmDialog } from "@/components/dialog/confirm-dialog";
import { NotDataFound } from "@/components/not-data-found";
import { Column, DataTable } from "@/components/table/data-table";
import { TableSelectedAction } from "@/components/table/table-selection-action";
import { DeleteIcon } from "@/icons/delete-icon";
import { Qna } from "@/interfaces/qna";
import { toast } from "@/lib/toast-store";

interface QnaTableProps {
  questions: Qna[];
}

const QnaTable = ({ questions }: QnaTableProps) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSelectAllClick = (checked: boolean) => {
    setSelectedRows(checked ? questions.map((m) => m.id) : []);
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleDeleteQna = async () => {
    startTransition(async () => {
      const res = await deleteQnas({ ids: selectedRows });
      if (res.success) {
        setSelectedRows([]);
        setOpenDeleteModal(false);
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    })

    
  }



  const columns: Column<Qna>[] = [
    {
      label: "Questions",
      key: "question",
      render: (row: Qna) => (
        <Box minWidth={200}>
          <Typography variant="h6">{row.question}</Typography>
        </Box>
      ),
    },
    {
      label: "Date",
      key: "created_at",
      render: (row: Qna) => dayjs(row.created_at).format("YYYY-MM-DD"),
    },
  ];
  return (
    <>
      <Box position="relative">
        <TableSelectedAction
          rowCount={questions.length}
          numSelected={selectedRows.length}
          onSelectAllRows={handleSelectAllClick}
          action={
            <IconButton color="error" onClick={() => setOpenDeleteModal(true)}>
              <DeleteIcon />
            </IconButton>
          }
        />
        <DataTable
          rows={questions}
          emptyState={<NotDataFound hideIcon message="No questions found" />}
          columns={columns}
          rowKey="id"
          selectedKeys={selectedRows}
          onToggleRow={handleSelectRow}
          onToggleAll={handleSelectAllClick}
        />
      </Box>

      {openDeleteModal && (
        <ConfirmDialog
          open={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          title="Delete Questions"
          description="Are you sure you want to delete this questions?"
          onConfirm={handleDeleteQna}
          loading={isPending}
        />
      )}
    </>
  );
};

export default QnaTable;