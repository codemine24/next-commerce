import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { useFormContext, Controller } from "react-hook-form";

import { InputLabel } from "./input-label";

type Props = {
    name: string;
    label?: string;
    options: { label: string; value: string }[];
    required?: boolean;
    direction?: "row" | "column";
};

export const RadioButtonField = ({ name, label, options, required, direction }: Props) => {
    const { control } = useFormContext();

    return (
        <Box flex={1} width="100%">
            {label && <InputLabel required={required} label={label} />}

            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <FormControl component="fieldset" fullWidth error={Boolean(error)}>
                        <RadioGroup
                            {...field}
                            value={field.value || ""}
                            onChange={(event) => field.onChange(event.target.value)}
                            row={direction === "row"}
                        >
                            {options.map((option) => (
                                <FormControlLabel
                                    key={option.value}
                                    value={option.value}

                                    control={<Radio />}
                                    label={option.label}
                                />
                            ))}
                        </RadioGroup>
                        {error && <Box color="error.main" fontSize="12px">{error?.message}</Box>}
                    </FormControl>
                )}
            />
        </Box>
    );
};
