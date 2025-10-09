"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { makeImageUrl } from "@/utils/helper";
import CONFIG from "@/config";
import { Product } from "@/interfaces/product";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { Dispatch, SetStateAction } from "react";
import { OptimizeImage } from "../optimize-image";
import { API_ROUTES } from "@/lib/api-routes";
import { useFetch } from "@/hooks/use-fetch";

interface SearchResultPreviewProps {
    searchTerm: string;
    showResult: boolean;
    setShowResult: Dispatch<SetStateAction<boolean>>;
}

export const SearchResultPreview = ({ searchTerm, showResult, setShowResult }: SearchResultPreviewProps) => {
    const router = useRouter();
    const url = `${API_ROUTES.products.get_products}?searchTerm=${searchTerm}&limit=10`;
    const { data, isLoading } = useFetch(url);

    console.log(data);

    return (
        <>
            {/* {showResult && <Box
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
                {isLoading && <Box height={100} display="flex" alignItems="center" justifyContent="center"><CircularProgress size={20} /></Box>}

                {!isLoading && data.length > 0 && (
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
                                    '&:hover': {
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

                {!isLoading && data.length === 0 && (
                    <Box
                        height={100}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Typography variant="body2">No products found</Typography>
                    </Box>
                )}
            </Box>} */}
        </>
    );
};