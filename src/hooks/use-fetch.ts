"use client";

import { useState, useCallback, useEffect } from "react";

import api from "@/lib/api";

export const useFetch = (url: string): {
    data: any;
    error: string | null;
    isLoading: boolean;
    revalidate: () => void;
} => {
    const [data, setData] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await api.get(url);
            setData(response.data);

            // Set error if response is not successful
            if (!response.success) setError(response.message);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Revalidate data
    const revalidate = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, error, isLoading, revalidate };
};