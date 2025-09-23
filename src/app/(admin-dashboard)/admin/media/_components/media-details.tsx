"use client";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { OptimizeImage } from "@/components/optimize-image";
import { OverlayScrollbar } from "@/components/overlay-scrollbar";
import { Media } from "@/interfaces/media";
import { makeImageUrl } from "@/utils/helper";
import { formatDate, formatSize } from "@/utils/media-file";

interface MediaDetailsProps {
    media: Media;
    open: boolean;
    onClose: () => void;
}

export const MediaDetails = ({ media, open, onClose }: MediaDetailsProps) => {
    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
        >
            <OverlayScrollbar>
                <Box p={2} width={330}>
                    <OptimizeImage
                        src={makeImageUrl(media.path)}
                        alt={media.name}
                        width="100%"
                        height={200}
                        sx={{ borderRadius: 5 }}
                    />
                    <Typography variant="subtitle1" mt={2} sx={{ wordBreak: 'break-word' }}>{media.name}</Typography>

                    <Typography variant="subtitle2" fontWeight={500} mt={5}>Properties</Typography>
                    <Stack direction="column" spacing={0.5} fontSize={12} mt={1}>
                        <Item name="Size" value={formatSize(media.size)} />
                        <Item name="Height" value={media.height} />
                        <Item name="Width" value={media.width} />
                        <Item name="Type" value={media.type} />
                    </Stack>

                    <Typography variant="subtitle2" fontWeight={500} mt={5}>Uploaded By</Typography>
                    <Stack direction="column" spacing={0.5} fontSize={12} mt={1}>
                        <Item name="Name" value={media.uploaded_by.first_name + ' ' + media.uploaded_by.last_name} />
                        <Item name="Role" value={media.uploaded_by.role} />
                    </Stack>

                    <Typography variant="subtitle2" fontWeight={500} mt={5}>Uploaded On</Typography>
                    <Stack direction="column" spacing={0.5} fontSize={12} mt={1}>
                        <Item name="Date" value={formatDate(media.created_at)} />
                    </Stack>
                </Box>
            </OverlayScrollbar>
        </Drawer>
    );
}

const Item = ({ name, value }: { name: string; value: string | number }) => {
    return (
        <Box display="flex" alignItems="center">
            <Typography variant="subtitle2" fontWeight={500} width={100}>
                {name}:
            </Typography>
            <Typography variant="subtitle2" fontWeight={500} flex={1}>
                {value}
            </Typography>
        </Box>
    );
}