import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MuiTextField, { TextFieldProps } from "@mui/material/TextField";
import { Controller, useFormContext, useFieldArray } from "react-hook-form";

import { CloseIcon } from "@/icons/close";
import { PlusIcon } from "@/icons/plus";

import { InputLabel } from "./input-label";

type Props<TFormValues> = TextFieldProps & {
  name: keyof TFormValues & string;
  label: string;
  placeholder?: string;
  required?: boolean;
};

export function MultiInputField<TFormValues>({
  name,
  label,
  placeholder,
  required,
  helperText,
  type = "text",
  ...other
}: Props<TFormValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  // Use useFieldArray for dynamic array inputs
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  // Access array-level error (e.g. nonempty validation)
  const arrayError = errors?.[name]?.message as string | undefined;

  return (
    <Box flex={1} width="100%">
      <InputLabel required={required} label={label} />

      <Box mb={1}>
        {fields.length > 0 ? (
          fields.map((field, index) => {
            // Error for the individual field item (e.g. empty string)
            const fieldError =
              errors?.[name] && Array.isArray(errors[name])
                ? (errors[name] as any)[index]?.message || null
                : null;

            return (
              <Box
                key={field.id}
                display="flex"
                alignItems="start"
                marginBottom={1}
                gap={2}
              >
                <Controller
                  name={`${name}.${index}` as const}
                  control={control}
                  rules={{
                    required: required ? "This field is required" : false,
                  }}
                  render={({ field }) => (
                    <MuiTextField
                      {...field}
                      type={type}
                      fullWidth
                      size="small"
                      placeholder={placeholder || label}
                      error={Boolean(fieldError)}
                      helperText={fieldError || helperText}
                      {...other}
                    />
                  )}
                />

                <IconButton color="error" onClick={() => remove(index)}>
                  <CloseIcon />
                </IconButton>
              </Box>
            );
          })
        ) : (
          <Box
            color="text.secondary"
            bgcolor="background.paper"
            border={1}
            borderColor="divider"
            p={2}
            borderRadius={1}
          >
            No items added
          </Box>
        )}

        {arrayError && (
          <Box mt={1} color="error.main" fontSize="0.875rem">
            {arrayError}
          </Box>
        )}
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={() => append("" as any)}
        startIcon={<PlusIcon />}
      >
        Add Item
      </Button>
    </Box>
  );
}
