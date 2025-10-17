"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { BannerType } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";

import { TextField, Select, ImageUploader } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import { BANNER_TYPE, SLIDE_TYPE } from "@/constants/advertise";
import { AdvertiseSchema } from "@/zod/advertise-schema";

import { AdvertisePreview } from "./advertise-preview";

interface AdvertiseFormProps {
    methods: UseFormReturn<AdvertiseSchema>;
    onSubmit: (data: AdvertiseSchema) => void;
}

export const AdvertiseForm = ({ methods, onSubmit }: AdvertiseFormProps) => {
    const { watch } = methods;
    const type = watch("type");
    const advertiseType = type === BannerType.BANNER ? BANNER_TYPE : SLIDE_TYPE;

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        display="flex"
                        flexDirection="column"
                        gap={4}
                        p={4}
                        bgcolor="background.default"
                        border={1}
                        borderColor="divider"
                    >
                        <ImageUploader
                            required
                            multiple={false}
                            name="image"
                            label="Image"
                            heading="Image"
                            sx={{ width: 300, height: 300 }}
                        />
                        <Select
                            required
                            name="type"
                            label="Type"
                            placeholder="Select a banner type"
                            options={
                                Object.values(BannerType).map((type) => ({
                                    label: type,
                                    value: type,
                                })) || []
                            }
                        />

                        <Select
                            required
                            name="name"
                            label="Section"
                            placeholder="Select a section"
                            options={advertiseType}
                        />

                        <TextField type="text" name="title" label="Advertise Title" />
                        <TextField type="text" name="sub_title" label="Advertise Sub Title" />

                        <TextField type="text" name="button_text" label="Advertise Button Text" />
                        <TextField type="text" name="url" label="Advertise URL" />
                    </Box>
                </Grid>

                {/* Preview */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <AdvertisePreview methods={methods} />
                </Grid>
            </Grid>

            {/* Submit Button */}
            <Box display="flex" justifyContent="flex-end" gap={2} mt={5}>
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
        </FormProvider>
    );
};