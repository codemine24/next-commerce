"use client";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

import CONFIG from "@/config";
import { useFetch } from "@/hooks/use-fetch";
import { Product } from "@/interfaces/product";
import { API_ROUTES } from "@/lib/api-routes";
import { makeImageUrl } from "@/utils/helper";

import { OptimizeImage } from "../optimize-image";

interface SearchResultPreviewProps {
  searchTerm: string;
  setShowResult: Dispatch<SetStateAction<boolean>>;
}

export const SearchResultPreview = ({
  searchTerm,
  setShowResult,
}: SearchResultPreviewProps) => {
  const router = useRouter();
  const url = `${API_ROUTES.products.get_products}?search_term=${searchTerm}&limit=10`;
  const { data, isLoading } = useFetch(url);

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          zIndex: 9999,
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          maxHeight: 400,
          overflowY: "auto",
          scrollbarWidth: "thin",
          borderRadius: "8px",
          color: "text.primary",
          backgroundColor: "background.paper",
        }}
      >
        {isLoading && (
          <Box
            height={100}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <CircularProgress size={20} />
          </Box>
        )}

        {!isLoading && data && data?.length > 0 && (
          <Stack>
            {data.map((product: Product) => (
              <Box
                key={product.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 1,
                  cursor: "pointer",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  "&:hover": {
                    backgroundColor: "action.hover",
                  },
                }}
                onClick={() => {
                  setShowResult(false);
                  router.push(`/${product.slug}`);
                }}
              >
                <OptimizeImage
                  src={makeImageUrl(product.thumbnail, CONFIG.general_bucket)}
                  alt={product.name}
                  width={44}
                  height={44}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2">{product.name}</Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        )}

        {!isLoading && data && data.length === 0 && (
          <Box
            height={100}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Typography variant="body2">No products found</Typography>
          </Box>
        )}
      </Box>
    </>
  );
};
