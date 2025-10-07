"use client";
import { Box, Fade, IconButton, Typography, Zoom } from "@mui/material";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useFormContext, useWatch } from "react-hook-form";

import { CloseIcon } from "@/icons/close";
import { UploadCloudIcon } from "@/icons/upload-cloud-icon";
import { makeImageUrl } from "@/utils/helper";
import { InputLabel } from "../form/input-label";

type ImageUploaderProps = {
  name: string;
  label?: string;
  accept?: { [mime: string]: string[] };
  required?: boolean;
};

export const SingleImageUploader: React.FC<ImageUploaderProps> = ({
  name,
  label = "Upload Image",
  accept = { "image/*": [] },
  required = false,
}) => {
  
  const { control } = useFormContext();
  const currentValue = useWatch({ control, name });
  const [file, setFile] = useState<File | null>(null);

  // 🧠 Derive preview URL directly (no useEffect)
  const previewUrl = useMemo(() => {
    if (file) return URL.createObjectURL(file);
    if (currentValue instanceof File) return URL.createObjectURL(currentValue);
    if (typeof currentValue === "string" && currentValue.length > 0)
      return makeImageUrl(currentValue);
    return null;
  }, [file, currentValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple: false,
    onDrop: (acceptedFiles) => {
      const selected = acceptedFiles[0];
      setFile(selected);
    },
  });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange }, fieldState: { error } }) => {
        const handleSelect = (acceptedFiles: File[]) => {
          const selected = acceptedFiles[0];
          setFile(selected);
          onChange(selected);
        };

        const handleRemove = () => {
          setFile(null);
          onChange(undefined);
        };

        return (
          <Box>
            {label && (
             <InputLabel required={required} label={label} />
            )}

            {!previewUrl ? (
              <Box
                {...getRootProps({ onClick: undefined })}
                sx={{
                  width: ["100%", 550],
                  border: "1px dotted",
                  borderColor: error ? "error.main" : "secondary.main",
                  borderRadius: 3,
                  px: 4,
                  py: 8,
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "0.25s ease",
                  backgroundColor: "background.paper",
                }}
                onClick={() =>
                  document.getElementById(`upload-${name}`)?.click()
                }
              >
                <input
                  {...getInputProps({
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                      const files = e.target.files;
                      if (files && files.length > 0)
                        handleSelect(Array.from(files));
                    },
                    id: `upload-${name}`,
                  })}
                />
                <UploadCloudIcon width={50} height={50} />
                <Typography color="secondary.main">
                  {isDragActive
                    ? "Drop your image here..."
                    : "Drop or select image"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click or drag & drop to upload an image.
                </Typography>
              </Box>
            ) : (
              <Fade in>
                <Box
                  sx={{
                    position: "relative",
                    width: 150,
                    height: 150,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "1px solid #ddd",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  }}
                >
                  <Zoom in>
                    <Image
                      src={previewUrl}
                      alt="uploaded"
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </Zoom>
                  <IconButton
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                      background: "rgba(0,0,0,0.5)",
                      color: "white",
                      "&:hover": { background: "rgba(0,0,0,0.7)" },
                    }}
                    onClick={handleRemove}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Fade>
            )}

            {error && (
              <Typography
                variant="caption"
                color="error"
                display="block"
                mt={1}
              >
                {error.message}
              </Typography>
            )}
          </Box>
        );
      }}
    />
  );
};
