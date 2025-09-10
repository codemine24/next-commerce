"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Editor } from "@/components/editor";
import {
  Autocomplete,
  ColorPicker,
  FileUploader,
  Select,
  TextField,
} from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { SubmitButton } from "@/components/submit-button";
import { PRODUCT_SIZE, PRODUCT_TAGS } from "@/constants/product";
import api from "@/lib/api";
import { API_ROUTES } from "@/lib/api-routes";
import { toast } from "@/lib/toast-store";
import { ProductSchema, productSchema } from "@/zod/product-schema";

const Brand = [
  { id: 1, label: "Brand 1", value: "brand-1" },
  { id: 2, label: "Brand 2", value: "brand-2" },
  { id: 3, label: "Brand 3", value: "brand-3" },
];

export const ProductForm = () => {
  const router = useRouter();
  const methods = useForm<ProductSchema>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data: ProductSchema) => {
    const response = await api.post(API_ROUTES.products.create_product, {
      body: JSON.stringify(data),
    });

    if (!response.success) {
      toast.error(response.message);
    } else {
      toast.success(response.message);
      router.replace("/admin/products");
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={methods.handleSubmit(onSubmit)}>
      <Box display="flex" flexDirection="column" gap={4}>
        {/* Product Name */}
        <TextField type="text" name="name" label="Product Name" required />

        {/* Model and Brand */}
        <Box display="flex" gap={2} alignItems="center">
          <TextField type="text" name="model" label="Model" />
          <Select
            name="brand_id"
            label="Brand"
            options={Brand}
            placeholder="Select a brand"
          />
        </Box>

        {/* Size and Color */}
        <Box display="flex" gap={2} alignItems="center">
          <Select
            name="size"
            label="Size"
            options={PRODUCT_SIZE}
            placeholder="Select a size"
          />
          <ColorPicker name="color" label="Color" />
        </Box>

        {/* Tags and Product Code */}
        <Box display="flex" gap={2} alignItems="center">
          <Autocomplete
            multiple
            name="tags"
            label="Select Tags"
            options={PRODUCT_TAGS}
          />
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
          <TextField
            type="number"
            name="discount_price"
            label="Discount Price"
          />
        </Box>

        {/* Editor */}
        <Editor
          label="Description"
          placeholder="Write product description here"
          defaultValue=""
          setValue={(value) => methods.setValue("description", value)}
        />

        {/* File Uploader */}
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
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
