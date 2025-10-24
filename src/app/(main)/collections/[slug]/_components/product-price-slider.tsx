"use client";

import { Slider } from "@mui/material";
import Box from '@mui/material/Box';
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from 'react';

import { Meta } from '@/interfaces/api';

interface Props {
    meta: Meta;
    onClose: () => void;
}

export const ProductPriceSlider = ({ meta, onClose }: Props) => {
    const MIN_DISTANCE = meta?.max_price ? meta?.max_price / 20 : 5000;
    const MAX_PRICE = meta?.max_price || 5000;
    const [value, setValue] = useState<number[]>([0, MAX_PRICE]);

    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const param = searchParams.get("price_range");

        if (param) {
            const [minStr, maxStr] = param.split(",");
            const min = parseInt(minStr, 10);
            const max = parseInt(maxStr, 10);

            if (!isNaN(min) && !isNaN(max)) {
                setValue([min, max]);
            }
        }
    }, []);

    const handleChange = (
        event: Event,
        newValue: number[],
        activeThumb: number
    ) => {
        let updatedValue: number[];

        if (activeThumb === 0) {
            updatedValue = [
                Math.min(newValue[0], value[1] - MIN_DISTANCE),
                value[1],
            ];
        } else {
            updatedValue = [
                value[0],
                Math.max(newValue[1], value[0] + MIN_DISTANCE),
            ];
        }

        setValue(updatedValue);
    };

    const handleChangeCommitted = (
        event: React.SyntheticEvent | Event,
        newValue: number[]
    ) => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set("price_range", `${newValue[0]},${newValue[1]}`);
        router.push(`${pathname}?${searchParams.toString()}`);
        onClose();
    };

    return (
        <>
            <Box display="flex" justifyContent="space-between" mb={2}>
                <Box
                    width={80}
                    height={30}
                    pt={0.5}
                    border={1}
                    borderColor="divider"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {value[0]}
                </Box>
                <Box
                    width={80}
                    height={30}
                    pt={0.5}
                    border={1}
                    borderColor="divider"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    {value[1]}
                </Box>
            </Box>
            <Slider
                value={value}
                onChange={handleChange}
                onChangeCommitted={handleChangeCommitted}
                disableSwap
                min={MIN_DISTANCE}
                max={MAX_PRICE}
            />
        </>
    );
};