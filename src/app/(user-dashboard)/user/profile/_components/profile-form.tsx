"use client"
import { Box, Grid } from "@mui/material";

import { TextField } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { PhoneInputField } from "@/components/form/phone-input-field";
import { SubmitButton } from "@/components/submit-button";
import { SingleImageUploader } from "@/components/uploader/single-image-uploader";
import { updateProfileSchema, UpdateProfileSchemaType } from "@/zod/update-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


export const UpdateProfileForm = () => {

    const methods = useForm<UpdateProfileSchemaType>({
        resolver: zodResolver(updateProfileSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            contact_number: "",
            avatar: undefined,
        },
    });

    const onSubmit = async (data: UpdateProfileSchemaType) => {
        console.log(data);
    }
    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>

            <Box>
                <Grid container spacing={2}>

                    <Grid size={{ xs: 12 }}>
                        <SingleImageUploader name="avatar" label="Profile Photo" />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            name="first_name"
                            label="First Name"
                            required
                            sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <TextField
                            name="last_name"
                            label="Last Name"
                            required
                            sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, sm: 12 }}>
                        <PhoneInputField
                            name="contact_number"
                            label="Contact Number"
                            required
                            sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <SubmitButton
                label="Update Profile"
                isLoading={methods.formState.isSubmitting}
                sx={{
                    width: 200,
                    height: 50,
                    textTransform: "none",
                }}
            />

        </FormProvider>
    );
};
