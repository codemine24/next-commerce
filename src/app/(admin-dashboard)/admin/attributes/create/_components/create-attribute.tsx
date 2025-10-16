"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { createAttribute } from "@/actions/attribute";
import { Category } from "@/interfaces/category";
import { toast } from "@/lib/toast-store";
import { attributeSchema, AttributeSchema } from "@/zod/attribute-schema";

import { AttributeForm } from "../../_components/attribute-form";

interface CreateAttributeProps {
  categories: Category[];
}

export const CreateAttribute = ({ categories }: CreateAttributeProps) => {
  const router = useRouter();
  const methods = useForm<AttributeSchema>({
    resolver: zodResolver(attributeSchema),
    defaultValues: {
      name: "",
      type: "",
      attribute_values: [],
      category_id: undefined,
    },
  });

  const onSubmit = async (data: AttributeSchema) => {
    const res = await createAttribute(data);

    if (!res.success) {
      toast.error(res.message);
      return;
    }

    toast.success(res.message);
    router.replace("/admin/attributes");
  };

  return (
    <Box pb={10}>
      <Typography variant="h4" sx={{ my: 4 }}>
        Create Attribute
      </Typography>

      <AttributeForm
        methods={methods}
        onSubmit={onSubmit}
        categories={categories}
      />
    </Box>
  );
};
