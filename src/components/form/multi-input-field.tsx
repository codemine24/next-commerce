
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { useState } from "react";
import { useFormContext, Controller } from "react-hook-form";

import { CloseIcon } from "@/icons/close";
import { PlusIcon } from "@/icons/plus";

import { InputLabel } from "./input-label";

type Props = TextFieldProps & {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
};

export const MultiInputField = ({
    name,
    label,
    placeholder,
    required,
    helperText,
    type = "text",
    ...other
}: Props) => {
    const { control, setValue, getValues } = useFormContext();
    const [values, setValues] = useState<(string | number)[]>(getValues(name));

    const handleAddItem = () => {
        setValues((prev) => [...prev, ""]);
    };

    const handleRemoveItem = (index: number) => {
        setValues((prev) => prev.filter((_, i) => i !== index));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number) => {
        const updatedValues = [...values];
        updatedValues[index] = type === "number" ? Number(event.target.value) : event.target.value;
        setValues(updatedValues);
        setValue(name, updatedValues);
    };

    return (
        <Box flex={1} width="100%">
            <InputLabel required={required} label={label} />
            <Box mb={1}>
                {values.length > 0 && values.map((value, index) => (
                    <Box key={index} display="flex" alignItems="start" marginBottom={1} gap={2}>
                        <Controller
                            name={`${name}[${index}]`}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <MuiTextField
                                    {...field}
                                    type={type}
                                    value={value}
                                    fullWidth
                                    size="small"
                                    placeholder={placeholder || label}
                                    onChange={(event) => handleChange(event, index)}
                                    error={Boolean(error)}
                                    helperText={error?.message || helperText}
                                    {...other}
                                />
                            )}
                        />
                        <IconButton
                            color="error"
                            onClick={() => handleRemoveItem(index)}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                ))}

                {values.length === 0 && (
                    <Box color="text.secondary" bgcolor="background.paper" border={1} borderColor="divider" p={2}>
                        No items added
                    </Box>
                )}
            </Box>
            <Button
                variant="contained"
                color="primary"
                onClick={handleAddItem}
                startIcon={<PlusIcon />}
            >
                Add Item
            </Button>
        </Box>
    );
};