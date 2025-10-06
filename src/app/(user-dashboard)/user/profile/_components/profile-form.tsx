"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Grid } from "@mui/material";
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
export const UpdateProfileForm = ({ profileData }: { profileData: any }) => {
  const { setUser } = useAuth();
  const methods = useForm<UpdateProfileSchemaType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      first_name: profileData?.first_name || "",
      last_name: profileData?.last_name || "",
      contact_number: profileData?.contact_number || "",
      avatar: profileData?.avatar || "",
    },
  });

  const onSubmit = async (data: UpdateProfileSchemaType) => {
    const res = await updateProfile(data);
    if (!res.success) {
      return toast.error(res.message);
    }

    toast.success(res.message);
    const resData = res.data;
    // methods.reset();
    setUser((prev) =>
      prev
        ? {
            ...prev,
            avatar: resData.avatar as string,
            first_name: resData.first_name as string,
            last_name: resData.last_name as string,
            contact_number: resData.contact_number as string,
          }
        : prev
    );
  };

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
