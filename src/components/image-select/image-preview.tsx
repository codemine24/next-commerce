import Box from "@mui/material/Box";
import Image from "next/image";
import { FieldValues, UseFormSetValue } from "react-hook-form";

import { CloseIcon } from "@/icons/close";
import { makeImageUrl } from "@/utils/helper";

interface ImagePreviewProps {
    path: string;
    field: FieldValues;
    multiple?: boolean;
    setValue: UseFormSetValue<FieldValues>;
}

export const ImagePreview = ({ path, field, multiple = false, setValue }: ImagePreviewProps) => {
    const handleRemoveImage = () => {
        if (multiple) {
            setValue(field.name, field.value.filter((img: string) => img !== path));
        } else {
            setValue(field.name, null, { shouldDirty: true, shouldValidate: true });
        }
    };

    return (
        <Box
            p={1}
            border={1}
            borderColor="divider"
            position="relative"
        >
            <Image
                src={makeImageUrl(path)}
                alt="Selected Image"
                width={120}
                height={120}
            />

            <Box
                component={CloseIcon}
                onClick={handleRemoveImage}
                sx={{
                    p: 0.5,
                    height: 30,
                    width: 30,
                    borderRadius: '50%',
                    backgroundColor: 'background.paper',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    top: 2,
                    right: 2,
                    zIndex: 2,
                    cursor: 'pointer',
                }}
            >
                <CloseIcon />
            </Box>
        </Box>
    )
}