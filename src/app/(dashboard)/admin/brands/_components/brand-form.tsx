"use client";

import FormProvider from "@/components/ui/form/form-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { brandSchema, BrandSchema } from "@/zod/brand-schema";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FileUploader, TextField } from "@/components/ui/form";
import { SubmitButton } from "@/components/ui/submit-button";
import api from "@/lib/api";
import { useToast } from "@/providers/toast-provider";
import { useRouter } from "next/navigation";
import { Editor } from "@/components/ui/editor";
import { API_ROUTES } from "@/lib/api-routes";

export const BrandForm = () => {
    const toast = useToast();
    const router = useRouter();
    const methods = useForm<BrandSchema>({
        resolver: zodResolver(brandSchema),
    });

    const onSubmit = async (data: BrandSchema) => {
        const response = await api.post(API_ROUTES.brands.create_brand, { body: JSON.stringify(data) });

        if (!response.success) {
            toast.showMessage(response.message, "error");
        } else {
            toast.showMessage(response.message, "success");
            router.replace("/admin/brands");
        }
    }
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