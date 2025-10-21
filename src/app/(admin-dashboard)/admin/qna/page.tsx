import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { Suspense } from "react";

import { TableToolbar } from "@/components/table/table-toolbar";
import { TableToolbarSkeleton } from "@/components/table/table-toolbar-skeleton";

import { UserTabs } from "../users/_components/user-tabs";

import QnaContent from "./_components/qna-content";



export default function QnaPage() {
  return (
    <Box>
      <Typography variant="h4">QnA</Typography>
      <Suspense fallback={<TableToolbarSkeleton />}>
        <UserTabs />
        <TableToolbar href="" addButtonText="Add User" />
      </Suspense>
      <QnaContent />
    </Box>
  );
}