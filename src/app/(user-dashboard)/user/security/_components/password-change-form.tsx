"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import { passwordChangeSchema, PasswordChangeFormType } from "@/zod/password-change-schema";

export const PasswordChangeForm = () => {
    const methods = useForm<PasswordChangeFormType>({
        resolver: zodResolver(passwordChangeSchema),
        defaultValues: {
            old_password: "",
            new_password: "",
            confirm_password: "",
        },
    });

    const onSubmit = (data: PasswordChangeFormType) => {
        console.log("Data", data);
    };

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={2} maxWidth={400}>
                <TextField name="old_password" label="Current Password" type="password" required />
                <TextField name="new_password" label="New Password" type="password" required />
                <TextField name="confirm_password" label="Confirm Password" type="password" required />

                <Box display="flex" justifyContent="flex-start">
                    <SubmitButton isLoading={methods.formState.isSubmitting} label="Change Password" />
                </Box>
            </Box>
        </FormProvider>
    );
};