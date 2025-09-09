"use client";

import { signupSchema, SignupSchemaType } from "@/zod/signup-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { API_ROUTES } from "@/lib/api-routes";
import { useToast } from "@/providers/toast-provider";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { SignupForm } from "./signup-form";
import api from "@/lib/api";

export const SignupFormContainer = () => {
    const router = useRouter();
    const toast = useToast();
    const methods = useForm<SignupSchemaType>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            contact_number: "",
            password: "",
            confirm_password: "",
        },
    });

    const onSubmit = async (data: SignupSchemaType) => {
        const response = await api.post(API_ROUTES.auth.register, {
            body: JSON.stringify({ ...data, confirm_password: undefined }),
        });

        if (!response.success) {
            toast.showMessage(response.message, "error");
            return;
        }

        toast.showMessage("User registered successfully", "success");
        router.replace("/login");
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            maxWidth="sm"
            mx="auto"
            p={4}
            border={1}
            borderColor="divider"
        >
            <Typography variant="h5" align="center" mb={2} fontWeight="bold">
                Create Account
            </Typography>

            <SignupForm methods={methods} onSubmit={onSubmit} />
        </Box>
    );
}
