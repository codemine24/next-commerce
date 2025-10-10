"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";

import { updateBrand } from "@/actions/brand";
import { AnimatedDialog } from "@/components/dialog/animate-dialog";
import { SubmitButton } from "@/components/submit-button";
import { CloseIcon } from "@/icons/close";
import { Brand } from "@/interfaces/brand";
import { toast } from "@/lib/toast-store";
import { brandSchema, BrandSchema } from "@/zod/brand-schema";

import { BrandForm } from "./brand-form";

interface BrandEditDialogProps {
  open: boolean;
  onClose: () => void;
  brand: Brand;
}

export const BrandEditDialog = ({
  open,
  onClose,
  brand,
}: BrandEditDialogProps) => {
  const methods = useForm<BrandSchema>({
    resolver: zodResolver(brandSchema),
    defaultValues: {
      name: brand.name,
      code: brand.code,
      description: brand.description,
      icon: brand.icon,
    },
  });

  const onSubmit = async (data: BrandSchema) => {
    const res = await updateBrand(brand.id, data);

    if (res.success) {
      toast.success(res.message);
      onClose();
    } else {
      toast.error(res.message);
    }
  };

  console.log(methods.getValues());

  return (
    <AnimatedDialog
      open={open}
      onClose={onClose}
      title="Edit Brand"
      maxWidth="md"
      fullWidth
      transition="grow"
      sx={{ overflowX: "hidden" }}
    >
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8 }}
      >
        <CloseIcon />
      </IconButton>
      <DialogTitle>
        <Typography variant="h4">Edit Brand</Typography>
      </DialogTitle>

      <DialogContent
        sx={{ borderTop: 1, borderBottom: 1, borderColor: "divider" }}
      >
        <Box pt={2}>
          <BrandForm methods={methods} onSubmit={onSubmit} hideActionButtons />
        </Box>
      </DialogContent>

      <DialogActions>
        <Button
          variant="outlined"
          onClick={onClose}
          disabled={methods.formState.isSubmitting}
        >
          Cancel
        </Button>

        <SubmitButton
          label="Save"
          loadingLabel="Saving..."
          variant="contained"
          disabled={methods.formState.isSubmitting}
          isLoading={methods.formState.isSubmitting}
          sx={{ height: "auto" }}
          onClick={methods.handleSubmit(onSubmit)}
        />
      </DialogActions>
    </AnimatedDialog>
  );
};
