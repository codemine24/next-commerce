"use client";

import Box from "@mui/material/Box"
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useState } from "react";

import { ArrowDownIcon } from "@/icons/arrow-down-icon";
import { GridIcon } from "@/icons/grid-icon";
import { Category } from '@/interfaces/category'

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
          borderRight: 1,
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
            <Button
              fullWidth
              color="inherit"
              sx={{ justifyContent: "flex-start", px: 2 }}
              LinkComponent={Link}
              href="/collections"
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                fullWidth
                color="inherit"
                sx={{ justifyContent: "flex-start", px: 2 }}
                LinkComponent={Link}
                href={`/shop?category${category.slug}`}
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
