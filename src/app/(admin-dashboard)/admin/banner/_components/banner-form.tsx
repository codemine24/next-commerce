"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { TextField, Select, ImageUploader } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import { bannerSchema, BannerSchema } from "@/zod/banner-schema";
import { BannerType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const BannerForm = () => {
    const methods = useForm<BannerSchema>({
        resolver: zodResolver(bannerSchema),
    });

    const onSubmit = (data: BannerSchema) => {
        console.log(data);
    };
    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={4}>
                <ImageUploader
                    required
                    name="image"
                    label="Banner Image"
                    heading="Banner Image"
                    sx={{ width: 400, height: 300 }}
                />

                <Box display="flex" gap={2}>
                    <TextField type="text" name="name" label="Banner Name" required />
                    <Select
                        name="type"
                        label="Banner Type"
                        placeholder="Select a banner type"
                        options={
                            Object.values(BannerType).map((type) => ({
                                label: type,
                                value: type,
                            })) || []
                        }
                    />
                </Box>

                <Box display="flex" gap={2}>
                    <TextField type="text" name="title" label="Banner Title" />
                    <TextField type="text" name="sub_title" label="Banner Sub Title" />
                </Box>

                <Box display="flex" gap={2}>
                    <TextField type="text" name="button_text" label="Banner Button Text" />
                    <TextField type="text" name="url" label="Banner URL" />
                </Box>

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