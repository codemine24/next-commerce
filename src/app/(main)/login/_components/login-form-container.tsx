"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { addToCartForLogInUser } from "@/actions/cart";
import { useAuth } from "@/hooks/use-auth";
import { CartItem } from "@/interfaces/cart";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { toast } from "@/lib/toast-store";
import { loginSchema, LoginSchemaType } from "@/zod/login-schema";

import { LoginForm } from "./login-form";


export const LoginFormContainer = () => {
  const router = useRouter();
  const { setIsAuthenticated, setUser } = useAuth();
  const methods = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginSchemaType) => {
    const response = await api.post(API_ROUTES.auth.login, {
      body: JSON.stringify(data),
    });

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    const cart = Cookies.get("cart");

    if (cart) {
      const cartData = JSON.parse(cart);
      const payload = cartData.cart_items.map((item: CartItem) => ({
        product_id: item.product.id,
        quantity: item.quantity,
      }));
      await addToCartForLogInUser(payload);
      Cookies.remove("cart");
    }

    toast.success(response.message);
    setIsAuthenticated(true);
    setUser(response.data);
    router.replace("/");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      maxWidth={450}
      mx="auto"
      p={4}
      border={1}
      borderColor="divider"
    >
      <Typography variant="h5" align="center" mb={2} fontWeight="bold">
        Account Login
      </Typography>

      <LoginForm methods={methods} onSubmit={onSubmit} />
    </Box>
  );
};
