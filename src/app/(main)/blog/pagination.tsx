"use client";
import { BORDER_RADIUS } from "@/theme";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import React, { useState } from "react";

const MAX_PAGE = 50;
const DEFAULT_PAGE = 1;

export const PaginationOutlined = () => {
  const [page, setPage] = useState(DEFAULT_PAGE);

  return (
    <Box sx={{ py: 3 }}>
      <Pagination
        count={MAX_PAGE}
        page={page}
        onChange={(_, value) => setPage(value)}
        sx={{
          "& .MuiPaginationItem-root": {
            height: "32px",
            borderRadius: BORDER_RADIUS.default,
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "primary.main",
            color: "#ffffff",
          },
          "& .MuiPagination-ul": {
            justifyContent: "center",
          },
        }}
      />
    </Box>
  );
};
