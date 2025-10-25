import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { VisibilityIcon } from "@/icons/visibility";
import { VisibilityOffIcon } from "@/icons/visibility-off";

import { InputLabel } from "./input-label";

type Props = TextFieldProps & { name: string, label?: string, placeholder?: string, required?: boolean, hideLabel?: boolean };

export const TextField = ({ name, helperText, type = "text", label, placeholder, required, hideLabel = false, ...other }: Props) => {
    const { control } = useFormContext();
    const [inputType, setInputType] = useState(type);

    const handleClickShowPassword = () => {
        setInputType(inputType === "password" ? "text" : "password");
    };

    return (
        <Box flex={1} width="100%">
            {!hideLabel && <InputLabel required={required} label={label || ""} />}
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <MuiTextField
                        {...field}
                        type={inputType}
                        fullWidth
                        size="small"
                        placeholder={placeholder || label || ""}
                        value={field.value ?? ""}
                        onChange={(event) => {
                            const value = event.target.value;

                            if (type === "number") {
                                field.onChange(value === "" ? 0 : Number(value));
                            } else {
                                field.onChange(value);
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
                                        {inputType === "password" ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                    </IconButton>
                                </InputAdornment>,
                            },
                            htmlInput: {

                            }
                        }}
                        {...other}

                    />
                )}
            />
        </Box>
    );
}