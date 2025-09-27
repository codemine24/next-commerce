import { Box, TextFieldProps } from "@mui/material";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { Controller, useFormContext } from "react-hook-form";

import { InputLabel } from "./input-label";

type Props = Omit<TextFieldProps, "name" | "label"> & {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    minDate?: Date;
};

export const DateField = ({ name, label, placeholder, required, helperText, minDate, ...other }: Props) => {
    const { control } = useFormContext();

    return (
        <Box flex={1} width="100%">
            <InputLabel required={required} label={label} />
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <MuiDatePicker
                        value={field.value ? dayjs(field.value) : null}
                        onChange={(date: Dayjs | null) => {
                            field.onChange(date ? date.toISOString() : null);
                        }}
                        minDate={minDate ? dayjs(minDate) : undefined}
                        slotProps={{
                            textField: {
                                fullWidth: true,
                                error: Boolean(error),
                                helperText: error?.message || helperText,
                                placeholder: placeholder || label,
                                size: "small",
                                sx: {
                                    "& .MuiPickersInputBase-root": {
                                        py: 1,
                                        borderRadius: 0,
                                    },
                                },
                                ...other,
                            },
                        }}
                    />
                )}
            />
        </Box>
    );
};
