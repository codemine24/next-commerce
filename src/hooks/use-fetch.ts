"use client";

import { useState, useCallback, useEffect } from "react";

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
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        console.log("Fetching data...");
        setIsLoading(true);
        const response = await api.get(url);
        setIsLoading(false);
        setData(response.data);
        setSuccess(response.success);
        setMessage(response.message);
    }, [url]);

    const revalidate = useCallback(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, success, message, isLoading, revalidate };
};