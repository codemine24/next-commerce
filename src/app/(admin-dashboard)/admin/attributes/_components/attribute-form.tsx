"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { AttributeType } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";

import { TextField, Select, MultiInputField } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import { Category } from "@/interfaces/category";
import { AttributeSchema } from "@/zod/attribute-schema";

interface AttributeFormProps {
  methods: UseFormReturn<AttributeSchema>;
  onSubmit: (data: AttributeSchema) => void;
  categories: Category[];
}

export const AttributeForm = ({
  methods,
  onSubmit,
  categories,
}: AttributeFormProps) => {
  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={4}>
        <TextField type="text" name="title" label="Attribute Title" required />
        <Select
          name="category_id"
          label="Category"
          placeholder="Select a category"
          options={
            categories?.map((category) => ({
              label: category.title,
              value: category.id,
            })) || []
          }
        />

        <Select
          name="type"
          label="Attribute Type"
          placeholder="Select an attribute type"
          options={Object.values(AttributeType).map((type) => ({
            label: type,
            value: type,
          }))}
        />

        <MultiInputField
          name="attribute_values"
          label="Attribute Values"
          required
          placeholder="Enter attribute value"
        />

        {/* Submit Button */}
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button
            variant="outlined"
            disabled={methods.formState.isSubmitting}
            sx={{
              width: 200,
              height: 50,
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <SubmitButton
            label="Submit"
            isLoading={methods.formState.isSubmitting}
            sx={{
              width: 200,
              height: 50,
              textTransform: "none",
            }}
          />
        </Box>
      </Box>
    </FormProvider>
  );
};
