import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number = 500, callback?: () => void): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
            callback?.();
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay, callback]);

    return debouncedValue;
}