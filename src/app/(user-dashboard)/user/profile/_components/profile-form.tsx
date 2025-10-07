"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { PhoneInputField } from "@/components/form/phone-input-field";
import { FormContainer } from "@/components/form-container";
import { SubmitButton } from "@/components/submit-button";
import { SingleImageUploader } from "@/components/uploader/single-image-uploader";
import { useAuth } from "@/hooks/use-auth";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
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
      first_name: "",
      last_name: "",
      contact_number: "",
      avatar: "",
    },
  });

  const onSubmit = async (data: UpdateProfileSchemaType) => {
    const formData = new FormData();

    if (data?.avatar && data.avatar instanceof File) {
      formData.append("avatar", data.avatar);
    }

    const payload = {
      first_name: data.first_name,
      last_name: data.last_name,
      contact_number: data.contact_number,
    };

    formData.append("data", JSON.stringify(payload));

    const res = await api.patch(API_ROUTES.users.update_profile, {
      body: formData,
    });

    if (!res.success) {
      return toast.error(res.message)
    }

    toast.success(res.message);
    const resData = res.data;

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

  useEffect(() => {
    methods.reset({
      first_name: profileData?.first_name || "",
      last_name: profileData?.last_name || "",
      contact_number: profileData?.contact_number || "",
      avatar: profileData?.avatar || "",
    });
  }, [methods, profileData]);

  return (
    <FormContainer sx={{ p: 2 }}>
      <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <SingleImageUploader name="avatar" label="Profile Photo" required />
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
            // sx={{ maxWidth: { xs: "100%", sm: "320px" } }}
            />
          </Grid>
          <SubmitButton
            label="Update Profile"
            isLoading={methods.formState.isSubmitting}
            sx={{
              width: 200,
              height: 50,
              textTransform: "none",
            }}
          />
        </Grid>
      </FormProvider>
    </FormContainer>
  );
};
