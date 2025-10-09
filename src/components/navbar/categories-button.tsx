"use client";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { ArrowDownIcon } from "@/icons/arrow-down-icon";
import { GridIcon } from "@/icons/grid-icon";

import { Category } from '@/interfaces/category'
import Box from "@mui/material/Box"
import Popover from "@mui/material/Popover";
import { useState } from "react";
import Stack from "@mui/material/Stack";

interface CategoryButtonProps {
  categories: Category[]
}

export const CategoriesButton = ({ categories }: CategoryButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        startIcon={<GridIcon />}
        endIcon={<ArrowDownIcon />}
        onClick={handleClick}
        sx={{
          px: 2,
          height: "100%",
          minHeight: 0,
          borderRadius: 0,
          borderRight: "1px solid",
          borderColor: "divider",
          color: "text.primary",
        }}
      >
        <Typography variant="body2">Categories</Typography>
      </Button>


      <Popover
        id={Boolean(anchorEl) ? "simple-popover" : undefined}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box>
          <Stack width={250}>
            {categories.map((category) => (
              <Button
                key={category.id}
                fullWidth
                color="inherit"
                sx={{ justifyContent: "flex-start", px: 2 }}
              >
                {category.title}
              </Button>
            ))}
          </Stack>
        </Box>
      </Popover>
    </>
  );
};
