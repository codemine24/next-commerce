import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { BeneficiaryType, DiscountType } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";

import { DateField, TextField, Select, Autocomplete } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import { Brand } from "@/interfaces/brand";
import { Category } from "@/interfaces/category";
import { Product } from "@/interfaces/product";
import { CouponSchema } from "@/zod/coupon-schema";

interface CouponFormProps {
    methods: UseFormReturn<CouponSchema>;
    onSubmit: (data: CouponSchema) => void;
    categories: Category[];
    brands: Brand[];
    products: Product[];
}

export const CouponForm = ({ methods, onSubmit, categories, brands, products }: CouponFormProps) => {
    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={4}>
                {/* Coupon Code and Discount Type */}
                <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} alignItems="center">
                    <TextField name="code" label="Coupon Code" required />
                    <Select
                        name="discount_type"
                        label="Discount Type"
                        options={Object.values(DiscountType).map((type) => ({ label: type, value: type }))}
                        placeholder="Select a discount type"
                        required
                    />
                </Box>

                {/* Discount Value and Maximum Value */}
                <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} alignItems="center">
                    <TextField name="discount_value" label="Discount Value" required type="number" />
                    <TextField name="maximum_value" label="Maximum Value" type="number" />
                </Box>

                {/* Start Date and Expiration Date */}
                <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} alignItems="center">
                    <DateField name="start_date" label="Start Date" minDate={new Date()} required />
                    <DateField name="expiration_date" label="Expiration Date" minDate={new Date()} required />
                </Box>

                {/* Usage Limit and Per User Limit */}
                <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} alignItems="center">
                    <TextField name="usage_limit" label="Usage Limit" type="number" />
                    <TextField name="per_user_limit" label="Per User Limit" type="number" />
                </Box>

                {/* Minimum Order Amount and Beneficiary Type */}
                <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} alignItems="center">
                    <TextField name="min_order_amount" label="Minimum Order Amount" type="number" />
                    <Select
                        name="beneficiary_type"
                        label="Beneficiary Type"
                        options={Object.values(BeneficiaryType).map((type) => ({ label: type, value: type }))}
                        placeholder="Select a beneficiary type"
                    />
                </Box>

                {/* Eligible Categories, Brands, and Products */}
                <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }} alignItems="center">
                    {/* Eligible Categories */}
                    <Autocomplete
                        name="eligible_categories"
                        label="Eligible Categories"
                        placeholder="Select eligible categories"
                        options={categories?.map((category) => ({ label: category.title, value: category.id })) || []}
                        multiple
                    />

                    {/* Eligible Brands */}
                    <Autocomplete
                        name="eligible_brands"
                        label="Eligible Brands"
                        placeholder="Select eligible brands"
                        options={brands?.map((brand) => ({ label: brand.name, value: brand.id })) || []}
                        multiple
                    />

                    {/* Eligible Products */}
                    <Autocomplete
                        name="eligible_products"
                        label="Eligible Products"
                        placeholder="Select eligible products"
                        options={products?.map((product) => ({ label: product.name, value: product.id })) || []}
                        multiple
                    />
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
