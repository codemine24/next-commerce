import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { UseFormReturn } from "react-hook-form";

import { makeImageUrl } from "@/utils/helper";
import { AdvertiseSchema } from "@/zod/advertise-schema";

interface AdvertisePreviewProps {
    methods: UseFormReturn<AdvertiseSchema>;
}

export const AdvertisePreview = ({ methods }: AdvertisePreviewProps) => {
    const { watch } = methods;
    const image = watch("image");
    const title = watch("title");
    const sub_title = watch("sub_title");
    const button_text = watch("button_text");
    const url = watch("url");

    return (
        <Box
            sx={{
                backgroundImage: `url(${makeImageUrl(image)})`,
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "100%",
                height: "100%",
            }}
        >
            <Box>
                {title && <Typography variant="h6">{title}</Typography>}
                {sub_title && <Typography variant="body2">{sub_title}</Typography>}
                {button_text && <Button variant="contained" LinkComponent={Link} href={url}>{button_text}</Button>}
            </Box>
        </Box>
    );
}