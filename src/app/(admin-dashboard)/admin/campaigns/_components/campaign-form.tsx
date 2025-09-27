"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CampaignPlatform } from "@prisma/client";
import { UseFormReturn } from "react-hook-form";

import { Editor } from "@/components/editor";
import { ImageUploader, Select, TextField, MultiInputField, Autocomplete, DateField } from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import { Brand } from "@/interfaces/brand";
import { Category } from "@/interfaces/category";
import { Product } from "@/interfaces/product";
import { CampaignSchema } from "@/zod/campaign-schema";

interface CampaignFormProps {
    methods: UseFormReturn<CampaignSchema>;
    onSubmit: (data: CampaignSchema) => void;
    products: Product[];
    brands: Brand[];
    categories: Category[];
}

export const CampaignForm = ({ methods, onSubmit, products, brands, categories }: CampaignFormProps) => {
    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={4}>
                <TextField type="text" name="title" label="Campaign Title" required />
                <TextField type="text" name="sub_title" label="Campaign Sub Title" multiline rows={3} />

                {/* Description */}
                <Editor
                    label="Description"
                    placeholder="Write campaign description here"
                    defaultValue={methods.getValues("description") || ""}
                    setValue={(value) => methods.setValue("description", value)}
                />

                {/* Campaign Start and End Date */}
                <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
                    <DateField name="start_at" label="Campaign Start Date" minDate={new Date()} required />
                    <DateField name="end_at" label="Campaign End Date" minDate={new Date()} required />
                </Box>

                {/* Conditions */}
                <MultiInputField
                    name="conditions"
                    label="Conditions"
                    placeholder="Add a condition"
                />

                <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
                    {/* Platform */}
                    <Select
                        name="platform"
                        label="Platform"
                        placeholder="Select a platform"
                        options={Object.values(CampaignPlatform).map((platform) => ({ label: platform, value: platform }))}
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

                <Box display="flex" gap={2} flexDirection={{ xs: "column", sm: "row" }}>
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
                </Box>

                {/* Note */}
                <TextField type="text" name="note" label="Note" multiline rows={3} />

                {/* Thumbnail */}
                <ImageUploader
                    label="Campaign Thumbnail"
                    name="thumbnail"
                    heading="Select Campaign Thumbnail"
                    subHeading="Select campaign thumbnail for the campaign"
                />

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
