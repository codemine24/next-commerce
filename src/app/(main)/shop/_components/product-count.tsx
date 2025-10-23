"use client";

import { Select, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { PRODUCT_SORT } from "@/constants/product";
import { Meta } from "@/interfaces/api";

export const ProductsCount = ({ meta }: { meta: Meta }) => {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "default");

  return (
    <Box
      p={2}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      border={1}
      borderColor="divider"
      mb={2}
    >
      <Typography variant="subtitle1">
        Showing{" "}
        {meta.page * meta.limit > meta.total
          ? meta.total
          : meta.page * meta.limit}{" "}
        of {meta.total} products
      </Typography>

      <Box>
        <Select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          slotProps={{
            root: {
              sx: {
                height: 32,
                width: 180,
                borderRadius: 0,
                borderColor: "divider",
              },
            },
          }}
        >
          {PRODUCT_SORT.map((sort) => (
            <MenuItem key={sort.value} value={sort.value}>
              {sort.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};
