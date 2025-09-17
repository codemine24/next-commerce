"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { UseFormReturn } from "react-hook-form";

import { Editor } from "@/components/editor";
import { FileUploader, TextField } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import { BrandSchema } from "@/zod/brand-schema";

interface BrandFormProps {
    methods: UseFormReturn<BrandSchema>;
    onSubmit: (data: BrandSchema) => void;
}

export const BrandForm = ({ methods, onSubmit }: BrandFormProps) => {
    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={4}>
                <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} alignItems="center">
                    <TextField type="text" name="name" label="Brand Name" required />
                    <TextField type="text" name="code" label="Brand Code" />
                </Box>

                <Editor
                    label="Description"
                    placeholder="Write brand description here"
                    defaultValue=""
                    setValue={(value) => methods.setValue("description", value)}
                />
                <FileUploader
                    label="Brand Icon"
                    onFilesChange={(files) => methods.setValue("icon", files[0])}
                    uploadBoxSx={{ width: 140, height: 140 }}
                    hidePlaceholderText
                />

                {/* Submit Button */}
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                        variant="outlined"
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
    )
}