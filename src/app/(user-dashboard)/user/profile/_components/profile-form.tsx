"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { updateProfile } from "@/actions/user";
import { TextField } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { PhoneInputField } from "@/components/form/phone-input-field";
import { SubmitButton } from "@/components/submit-button";
import { SingleImageUploader } from "@/components/uploader/single-image-uploader";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/lib/toast-store";
import {
  updateProfileSchema,
  UpdateProfileSchemaType,
} from "@/zod/update-profile-schema";

export const UpdateProfileForm = () => {
  const { user } = useAuth();
  const methods = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      contact_number: user?.contact_number || "",
      avatar: undefined,
    },
  });

  const onSubmit = async (data: UpdateProfileSchemaType) => {
    const res = await updateProfile(data);
    if (!res.success) {
      return toast.error(res.message);
    }

    toast.success(res.message);
    methods.reset();
  };

  useEffect(() => {
    methods.reset({
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      contact_number: user?.contact_number || "",
      avatar: undefined,
    });
  }, [methods, user]);
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
