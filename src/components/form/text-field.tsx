import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { Visibility } from "@/icons/visibility";
import { VisibilityOff } from "@/icons/visibility-off";

import { InputLabel } from "./input-label";

type Props = TextFieldProps & { name: string, label: string, placeholder?: string, required?: boolean };

export const TextField = ({ name, helperText, type = "text", label, placeholder, required, ...other }: Props) => {
    const { control } = useFormContext();
    const [inputType, setInputType] = useState(type);

    const handleClickShowPassword = () => {
        setInputType(inputType === "password" ? "text" : "password");
    };


    return (
        <Box flex={1} width="100%">
            <InputLabel required={required} label={label} />
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <MuiTextField
                        {...field}
                        type={inputType}
                        fullWidth
                        placeholder={placeholder || label}
                        // value={field.value}
                        // onChange={field.onChange}
                        value={type === "number" && field.value === 0 ? "" : field.value}
                        onChange={(event) => {
                            if (type === "number") {
                                field.onChange(Number(event.target.value));
                            } else {
                                field.onChange(event.target.value);
                            }
                        }}
                        error={Boolean(error)}
                        helperText={error?.message || helperText}
                        slotProps={{
                            input: {
                                endAdornment: type === "password" && <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                    >
                                        {inputType === "password" ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>,
                            },
                        }}
                        {...other}
                    />
                )}
            />
        </Box>
    );
}