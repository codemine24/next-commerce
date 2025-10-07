"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { UseFormReturn } from "react-hook-form";

import { Editor } from "@/components/editor";
import { ImageUploader, Select, TextField } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import { Category } from "@/interfaces/category";
import { CategorySchema } from "@/zod/category-schema";

interface CreateCategoryProps {
  methods: UseFormReturn<CategorySchema>;
  onSubmit: (data: CategorySchema) => void;
  categories: Category[];
  hideActionButtons?: boolean;
}

export const CategoryForm = ({
  methods,
  onSubmit,
  categories,
  hideActionButtons = false,
}: CreateCategoryProps) => {
  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={4}>
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          <TextField type="text" name="title" label="Category Title" required />
          <TextField type="text" name="code" label="Category Code" />
        </Box>
        <Editor
          label="Description"
          placeholder="Write category description here"
          defaultValue={methods.getValues("description") || ""}
          setValue={(value) => methods.setValue("description", value)}
        />
        <Select
          label="Parent Category"
          name="parent_id"
          placeholder="Select a parent category"
          options={
            categories?.map((category) => ({
              value: category.id,
              label: category.title,
            })) || []
          }
        />
        <ImageUploader
          label="Category Icon"
          name="icon"
          heading="Select Category Icon"
          subHeading="Select category icon for the category"
        />

        {!hideActionButtons && (
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
        )}
      </Box>
    </FormProvider>
  );
};
