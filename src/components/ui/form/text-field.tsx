import { useFormContext, Controller } from "react-hook-form";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { InputLabel } from "./input-label";

type Props = TextFieldProps & { name: string, label: string, placeholder?: string, required?: boolean };

export const TextField = ({ name, helperText, type = "text", label, placeholder, required, ...other }: Props) => {
    const { control } = useFormContext();

    return (
        <Box flex={1} width="100%">
            <InputLabel required={required} label={label} />
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <MuiTextField
                        {...field}
                        type={type}
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
                        {...other}
                    />
                )}
            />
        </Box>
    );
}