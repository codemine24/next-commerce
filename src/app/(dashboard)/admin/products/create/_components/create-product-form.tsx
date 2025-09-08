"use client";

import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProductSchema, productSchema } from "@/zod/product-schema";
import FormProvider from "@/components/form/form-provider";
import Button from "@mui/material/Button";
import { TextField, Select, Autocomplete, FileUploader, ColorPicker } from "@/components/form";
import { PRODUCT_SIZE, PRODUCT_TAGS } from "@/constants/product";
import { Editor } from "@/components/editor";

const Brand = [
    { id: 1, label: "Brand 1", value: "brand-1" },
    { id: 2, label: "Brand 2", value: "brand-2" },
    { id: 3, label: "Brand 3", value: "brand-3" },
]

export const CreateProductForm = () => {
    const methods = useForm<ProductSchema>({
        resolver: zodResolver(productSchema),
    });

    const onSubmit = (data: ProductSchema) => {
        console.log(data);
    };

    return (
        <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" gap={4}>
                {/* Product Name */}
                <TextField type="text" name="name" label="Product Name" required />

                {/* Model and Brand */}
                <Box display="flex" gap={2} alignItems="center">
                    <TextField type="text" name="model" label="Model" />
                    <Select name="brand_id" label="Brand" options={Brand} placeholder="Select a brand" />
                </Box>

                {/* Size and Color */}
                <Box display="flex" gap={2} alignItems="center">
                    <Select name="size" label="Size" options={PRODUCT_SIZE} placeholder="Select a size" />
                    <ColorPicker name="color" label="Color" />
                </Box>

                {/* Tags and Product Code */}
                <Box display="flex" gap={2} alignItems="center">
                    <Autocomplete multiple name="tags" label="Select Tags" options={PRODUCT_TAGS} />
                    <TextField type="text" name="product_code" label="Product Code" />
                </Box>

                {/* Warranty and Stock */}
                <Box display="flex" gap={2} alignItems="center">
                    <TextField type="text" name="warranty" label="Warranty" />
                    <TextField type="number" name="stock" label="Stock" />
                </Box>

                {/* Price and Discount Price */}
                <Box display="flex" gap={2} alignItems="center">
                    <TextField type="number" name="price" label="Price" />
                    <TextField type="number" name="discount_price" label="Discount Price" />
                </Box>

                {/* Editor */}
                <Editor label="Description" placeholder="Write product description here" defaultValue="" setValue={(value) => methods.setValue("description", value)} />

                {/* File Uploader */}
                <Box display="flex" gap={2}>
                    <FileUploader
                        label="Thumbnail Image"
                        onFilesChange={(files) => methods.setValue("thumbnail", files[0])}
                        uploadBoxSx={{ width: 250, height: 200 }}
                    />
                    <FileUploader
                        multiple
                        label="Gallery Images"
                        onFilesChange={(files) => methods.setValue("gallery", files)}
                        containerSx={{ flex: 1, width: "100%" }}
                        uploadBoxSx={{ width: "100%", height: "100%" }}
                    />
                </Box>

                {/* Submit Button */}
                <Box display="flex" justifyContent="flex-end" gap={2}>
                    <Button
                        variant="outlined"
                        sx={{
                            width: 200,
                            height: 50,
                            textTransform: "none",
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{
                            width: 200,
                            height: 50,
                            textTransform: "none",
                        }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>
        </FormProvider>
    );
};