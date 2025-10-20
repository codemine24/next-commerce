import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { Suspense } from "react";

import { getAllQnas } from "@/actions/qna";
// import { DataTable } from "@/components/table/data-table";
import { TableToolbar } from "@/components/table/table-toolbar";
import { TableToolbarSkeleton } from "@/components/table/table-toolbar-skeleton";

import { UserContent } from "../users/_components/user-content";
import { UserTabs } from "../users/_components/user-tabs";

export default async function QnaPage() {
  const response = await getAllQnas();
  const questions = response.data;
  console.log("All questions", response.data);
  return (
    <Box>
      <Typography variant="h4">QnA</Typography>
      
      <Suspense fallback={<TableToolbarSkeleton />}>
        <UserTabs />
        <TableToolbar href="" addButtonText="Add User" />
      </Suspense>
      <UserContent searchParams={questions} />
      {/* <DataTable rows={questions} columns={columns} rowKey="id" /> */}
    </Box>
  );
}