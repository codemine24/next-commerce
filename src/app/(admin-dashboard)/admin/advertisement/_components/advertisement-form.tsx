"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BannerType } from "@prisma/client";
import { useForm } from "react-hook-form";

import { createBanner } from "@/actions/banner";
import { TextField, Select, ImageUploader } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import { toast } from "@/lib/toast-store";
import { advertisementSchema, AdvertisementSchema } from "@/zod/banner-schema";


export const AdvertisementForm = () => {
    const methods = useForm<AdvertisementSchema>({
        resolver: zodResolver(advertisementSchema),
        defaultValues: {
            image: "",
            type: BannerType.BANNER,
            name: "",
            title: "",
            sub_title: "",
            button_text: "",
            url: "",
        },
    });

    const onSubmit = async (data: AdvertisementSchema) => {
        const res = await createBanner(data);
        console.log(res);
        if (res.success) {
            toast.success(res.message);
        } else {
            toast.error(res.message);
        }
    };
    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={4}>
                <ImageUploader
                    required
                    name="image"
                    label="Image"
                    heading="Image"
                    sx={{ width: 300, height: 300 }}
                />

                <Box display="flex" gap={2}>
                    <TextField type="text" name="name" label="Banner Name" required />
                    <Select
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