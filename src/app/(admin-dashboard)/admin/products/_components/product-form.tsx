"use client";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { UseFormReturn } from "react-hook-form";

import { Editor } from "@/components/editor";
import {
  Autocomplete,
  ColorPicker,
  Select,
  TextField,
} from "@/components/form";
import FormProvider from "@/components/form/form-provider";
import { ImageUploader } from "@/components/form/image-uploader";
import { MultiInputField } from "@/components/form/multi-input-field";
import { SubmitButton } from "@/components/submit-button";
import { PRODUCT_SIZE, PRODUCT_TAGS } from "@/constants/product";
import { Brand as BrandType } from "@/interfaces/brand";
import { ProductSchema } from "@/zod/product-schema";

interface ProductFormProps {
  methods: UseFormReturn<ProductSchema>;
  onSubmit: (data: ProductSchema) => void;
  brands: BrandType[];
}

export const ProductForm = ({ methods, onSubmit, brands }: ProductFormProps) => {
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
            placeholder="Select a brand"
            options={brands?.map((brand) => ({ label: brand.name, value: brand.id })) || []}
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
          defaultValue={methods.getValues("description") || ""}
          setValue={(value) => methods.setValue("description", value)}
        />

        {/* Specification */}
        <Editor
          label="Specification"
          placeholder="Write product specification here"
          defaultValue={methods.getValues("specification") || ""}
          setValue={(value) => methods.setValue("specification", value)}
        />

        {/* Additional Information */}
        <Editor
          label="Additional Information"
          placeholder="Write product additional information here"
          defaultValue={methods.getValues("additional_information") || ""}
          setValue={(value) => methods.setValue("additional_information", value)}
        />

        {/* Multi Input Field */}
        <MultiInputField
          name="key_features"
          label="Key Features"
          placeholder="Enter key feature"
        />

        {/* File Uploader */}
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          <ImageUploader
            required
            label="Thumbnail Image"
            heading="Select Thumbnail Image"
            subHeading="Select thumbnail image for the product"
            name="thumbnail"
          />

          <ImageUploader
            multiple
            required
            label="Gallery Images"
            heading="Select Gallery Images"
            subHeading="Select gallery images for the product"
            name="gallery"
            sx={{ flex: 1 }}
          />
        </Box>

        {/* Video URL */}
        <TextField
          type="url"
          name="video_url"
          label="Video URL"
          placeholder="Enter video URL"
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
