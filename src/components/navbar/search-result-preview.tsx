"use client";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { useRef } from "react";

import CONFIG from "@/config";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useFetch } from "@/hooks/use-fetch";
import { Product } from "@/interfaces/product";
import { API_ROUTES } from "@/lib/api-routes";
import { makeImageUrl } from "@/utils/helper";

import { ErrorComponent } from "../error-component";
import { LoadingSpinner } from "../loading-spinner";
import { NotDataFound } from "../not-data-found";
import { OptimizeImage } from "../optimize-image";

interface SearchResultPreviewProps {
    searchTerm: string;
    setShowResult: Dispatch<SetStateAction<boolean>>;
}

export const SearchResultPreview = ({ searchTerm, setShowResult }: SearchResultPreviewProps) => {
    const router = useRouter();
    const url = `${API_ROUTES.products.get_products}?search_term=${searchTerm}&limit=10`;
    const { data, isLoading, success, revalidate } = useFetch(url);
    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, () => setShowResult(false));

    const handleViewAll = () => {
        setShowResult(false);
        router.push(`/shop?search_term=${searchTerm}`)
    }

    return (
        <>
            <Box
                ref={ref}
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
                    color: "text.primary",
                    backgroundColor: "background.paper",
                }}
            >
                {/* Loading UI */}
                {isLoading && <LoadingSpinner />}

                {/* Error UI */}
                {!isLoading && !success && <ErrorComponent hideIcon onRetry={revalidate} />}

                {/* Data UI */}
                {!isLoading && data?.length > 0 && (
                    <Box>
                        <Stack>
                            {data?.map((product: Product) => (
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

                        {data?.length > 5 && (
                            <Box p={1}>
                                <Button
                                    fullWidth
                                    variant="text"
                                    onClick={handleViewAll}
                                >
                                    View All
                                </Button>
                            </Box>
                        )}
                    </Box>
                )}

                {/* Not Data Found UI */}
                {!isLoading && data?.length === 0 && (<NotDataFound hideIcon message="No products found" />)}
            </Box>
        </>
    );
};