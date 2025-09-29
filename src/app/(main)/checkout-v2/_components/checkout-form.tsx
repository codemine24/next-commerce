
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import { UseFormReturn } from "react-hook-form";

import FormProvider from "@/components/form/form-provider";
import { Order } from "@/zod/order-schema";

import { CustomerInfo } from "./customer-info";
import { DeliveryMethod } from "./delivery-method";
import { PaymentType } from "./payment-type";



interface CheckoutFormProps {
    methods: UseFormReturn<Order>;
    onSubmit: (data: Order) => void;
}

export const CheckoutForm = ({ methods, onSubmit }: CheckoutFormProps) => {
    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <CustomerInfo />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Stack gap={3} direction={{ xs: "column", md: "row" }}>
                        <PaymentType />
                        <DeliveryMethod />
                    </Stack>
                </Grid>
            </Grid>
        </FormProvider>
    );
};