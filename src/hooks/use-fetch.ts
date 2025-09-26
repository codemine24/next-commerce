"use client";

import { useState, useCallback, useEffect, useTransition } from "react";

import api from "@/lib/api";

export const useFetch = (url: string): {
    data: any;
    success: boolean;
    message: string;
    isLoading: boolean;
    revalidate: () => void;
} => {
    const [data, setData] = useState(null);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState("");
    const [isLoading, startTransition] = useTransition();

    const fetchData = useCallback(async () => {
        startTransition(async () => {
            const response = await api.get(url, { cache: "no-store" });
            setData(response.data);
            setSuccess(response.success);
            setMessage(response.message);
        });
    }, [url]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const revalidate = useCallback(() => {
        fetchData();
    }, [fetchData]);

    return { data, success, message, isLoading, revalidate };
};