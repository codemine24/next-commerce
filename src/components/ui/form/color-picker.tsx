import { useFormContext, Controller } from "react-hook-form";
import FormHelperText from "@mui/material/FormHelperText";
import Box from "@mui/material/Box";
import { InputLabel } from "./input-label";

type Props = {
    name: string;
    label: string;
    placeholder?: string;
    required?: boolean;
    defaultColors?: string[];
};

export const ColorPicker = ({
    name,
    label,
    required,
    defaultColors = ["#ff0000", "#00ff00", "#0000ff"],
}: Props) => {
    const { control } = useFormContext();

    return (
        <Box flex={1} width="100%">
            <InputLabel required={required} label={label} />
            <Controller
                name={name}
                control={control}
                render={({ field, fieldState: { error } }) => (
                    <Box display="flex" alignItems="center" gap={3} height={55}>
                        {/*color input */}
                        <input
                            type="color"
                            value={field.value || "#000000"}
                            onChange={(e) => field.onChange(e.target.value)}
                            style={{
                                height: 40,
                                width: 40,
                                borderRadius: 6,
                                border: "1px solid #ccc",
                                cursor: "pointer",
                                padding: 0,
                                background: "transparent",
                            }}
                        />

                        {/* Default swatches */}
                        <Box display="flex" gap={1} flexWrap="wrap">
                            {defaultColors.map((color) => (
                                <Box
                                    key={color}
                                    onClick={() => field.onChange(color)}
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        border:
                                            field.value === color
                                                ? "2px solid black"
                                                : "1px solid #ddd",
                                        backgroundColor: color,
                                    }}
                                />
                            ))}
                        </Box>

                        {/* Error message */}
                        <FormHelperText error>{error?.message}</FormHelperText>
                    </Box>
                )}
            />
        </Box>
    );
};