import Box from "@mui/material/Box";
import MuiCheckbox, { CheckboxProps } from "@mui/material/Checkbox";
import FormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useFormContext, Controller } from "react-hook-form";

interface Props extends Omit<FormControlLabelProps, "control"> {
    name: string;
    size?: CheckboxProps["size"];
    color?: CheckboxProps["color"];
}

export const Checkbox = ({ name, size, color, ...other }: Props) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Box>
                    <FormControlLabel
                        control={<MuiCheckbox {...field} checked={field.value} size={size} color={color} />}
                        {...other}
                    />
                    {Boolean(error) && <FormHelperText error>{error?.message}</FormHelperText>}
                </Box>
            )}
        />
    );
}
