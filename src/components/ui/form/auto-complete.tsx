import { useFormContext, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import MuiAutocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import { InputLabel } from "./input-label";

interface Props<
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
> extends AutocompleteProps<Value, Multiple, DisableClearable, FreeSolo> {
    name: string;
    label: string;
    placeholder?: string;
}

export const Autocomplete = <
    Value,
    Multiple extends boolean | undefined,
    DisableClearable extends boolean | undefined,
    FreeSolo extends boolean | undefined
>({
    size,
    name,
    label,
    options,
    placeholder,
    ...other
}: Omit<Props<Value, Multiple, DisableClearable, FreeSolo>, "renderInput">) => {
    const { control, setValue } = useFormContext();

    return (
        <Box flex={1} width="100%">
            <InputLabel label={label} />
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <MuiAutocomplete
                        {...field}
                        options={options}
                        onChange={(_, newValue) => setValue(name, newValue, { shouldValidate: true })}
                        renderInput={(params) => (
                            <TextField
                                // label={label}
                                placeholder={placeholder}
                                error={Boolean(error)}
                                helperText={error?.message || ""}
                                {...params}
                                size={size}
                            />
                        )}
                        {...other}
                        slotProps={{
                            paper: {
                                sx: {
                                    backgroundColor: "background.default",
                                    borderRadius: 0,
                                    elevation: 0,
                                    boxShadow: "none",
                                    border: "1px solid",
                                    borderColor: "divider",
                                },
                            },
                            chip: {
                                sx: {
                                    backgroundColor: "primary.main",
                                    color: "primary.contrastText",
                                    "& .MuiChip-deleteIcon": {
                                        color: "primary.contrastText",
                                        "&:hover": {
                                            color: "primary.contrastText",
                                        },
                                    },
                                },
                            },
                        }}
                    />
                )}
            />
        </Box>
    );
}