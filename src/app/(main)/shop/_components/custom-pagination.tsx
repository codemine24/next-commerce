"use client";
import { alpha } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PaginationItem, {
  paginationItemClasses,
} from "@mui/material/PaginationItem";

export default function CustomPagination() {
  return (
    <Pagination
      count={4}
      page={1}
      shape="rounded"
      variant="outlined"
      renderItem={(item) => (
        <PaginationItem
          sx={{ width: "36px", height: "36px" }}
          {...item}
          slots={{
            previous: () => <>Previous</>,
            next: () => <>Next</>,
          }}
        />
      )}
      sx={{
        fontSize: "12px",
        fontWeight: 400,
        [`& .${paginationItemClasses.outlined}`]: {
          border: "none",
        },
        [`& .${paginationItemClasses.previousNext}`]: {
          border: "1px solid #E6F2EE",
          p: "17px 30px",
        },
        "& .Mui-selected": {
          backgroundColor: alpha("#08996B", 0.1),
          color: "#08996B",
          borderRadius: "8px",
          fontWeight: 400,
          "&:hover": {
            backgroundColor: "#F2FFFB",
          },
        },
      }}
    />
  );
}
