import Box from "@mui/material/Box";
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from "@mui/material/MenuItem";
import MuiSelect, { SelectProps } from "@mui/material/Select";
import { Controller, useFormContext } from "react-hook-form";

import { InputLabel } from "./input-label";


type Option = {
    value: string;
    label: string;
};

type Props = SelectProps & {
    name: string;
    label: string;
    options: Option[];
    placeholder?: string;
};

export const Select = ({ name, label, options, placeholder, ...other }: Props) => {
    const { control } = useFormContext();

    return (
        <Box flex={1} width="100%">
            <InputLabel label={label} />
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <>
                        <MuiSelect
                            fullWidth
                            displayEmpty
                            {...field}
                            {...other}
                            size="small"
                            MenuProps={{
                                PaperProps: {
                                    sx: {
                                        backgroundColor: "background.default",
                                        borderRadius: 0,
                                        elevation: 0,
                                        boxShadow: "none",
                                        border: "1px solid",
                                        borderColor: "divider",
                                    },
                                },
                            }}
                        >
                            {options.length > 0 && (
                                <MenuItem value="" disabled>
                                    <em>{placeholder || "Select an option"}</em>
                                </MenuItem>
                            )}
                            {options.length > 0 && options.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}

                            {options.length === 0 && (
                                <MenuItem disabled>
                                    No options available
                                </MenuItem>
                            )}
                        </MuiSelect>
                        <FormHelperText error>{error?.message}</FormHelperText>
                    </>
                )}
            />
        </Box>
    );
};