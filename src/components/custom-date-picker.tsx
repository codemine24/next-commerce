'use client';

import { FormHelperText, Popover } from '@mui/material';
import Button from '@mui/material/Button';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

interface CustomDatePickerProps {
    error: string;
    date: Date | undefined;
    buttonLabel: string;
    onChangeDate: (date: Date) => boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    buttonVariant?: "text" | "outlined" | "contained";
    buttonColor?: "primary" | "secondary" | "error" | "warning" | "info" | "success" | "inherit";
}

export const CustomDatePicker = (props: CustomDatePickerProps) => {
    const { error, date, buttonLabel, onChangeDate, startIcon, endIcon, buttonVariant, buttonColor = "inherit" } = props;

    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement | null>(null);

    const handleToggle = () => setOpen(prev => !prev);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button
                variant={buttonVariant}
                color={buttonColor}
                startIcon={startIcon}
                endIcon={endIcon}
                ref={anchorRef}
                onClick={handleToggle}
            >
                {buttonLabel}
            </Button>
            <Popover
                open={open}
                onClose={handleClose}
                anchorEl={anchorRef.current}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {error && <FormHelperText error sx={{ p: 2, pb: 0 }}>{error}</FormHelperText>}
                <DateCalendar
                    value={dayjs(date)}
                    onChange={(newValue) => {
                        if (newValue?.isValid()) {
                            const isValid = onChangeDate(newValue.toDate());
                            if (isValid) {
                                handleClose();
                            }
                        }
                    }}
                />
            </Popover>
        </>
    );
};