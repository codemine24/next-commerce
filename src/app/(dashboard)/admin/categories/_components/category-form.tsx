"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import { Editor } from "@/components/editor";
import { TextField } from "@/components/form";
import { FileUploader } from "@/components/form/file-uploader";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import { categorySchema, CategorySchema } from "@/zod/category-schema";

export const CategoryForm = () => {
    const methods = useForm<CategorySchema>({
        resolver: zodResolver(categorySchema),
    });

    const onSubmit = async (data: CategorySchema) => {
        console.log(data);
    };

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
                    defaultValue=""
                    setValue={(value) => methods.setValue("description", value)}
                />
                <TextField type="text" name="parent_id" label="Category Parent ID" />
                <FileUploader
                    label="Category Icon"
                    onFilesChange={(files) => methods.setValue("icon", files[0])}
                    uploadBoxSx={{ width: 140, height: 140 }}
                    hidePlaceholderText
                />

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
    );
};