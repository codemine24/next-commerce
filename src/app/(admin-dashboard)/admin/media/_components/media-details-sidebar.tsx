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

interface MediaDetailsSidebarProps {
    media: Media;
    open: boolean;
    onClose: () => void;
}

export const MediaDetailsSidebar = ({ media, open, onClose }: MediaDetailsSidebarProps) => {
    console.log(media);
    return (
        <Drawer
            open={open}
            onClose={onClose}
            anchor="right"
        >
            <OverlayScrollbar>
                <Box p={2} width={350}>
                    <OptimizeImage
                        src={makeImageUrl(media?.path)}
                        alt={media?.alt_text}
                        width="100%"
                        height={200}
                        sx={{ borderRadius: 5 }}
                    />
                    <Typography variant="subtitle1" mt={2} sx={{ wordBreak: 'break-word' }}>{media?.name}</Typography>

                    <Box border={1} borderColor="divider" p={2} mt={2}>
                        <Typography variant="subtitle1" fontWeight={600}>Properties</Typography>
                        <Stack direction="column" spacing={0.5} fontSize={12} mt={1}>
                            <Item name="Size" value={formatSize(media?.size)} />
                            <Item name="Type" value={media?.type} />
                            <Item name="Dimension" value={media?.height + ' x ' + media?.width} />
                        </Stack>
                    </Box>

                    <Box border={1} borderColor="divider" p={2} mt={2}>
                        <Typography variant="subtitle1" fontWeight={600}>Storage Info</Typography>
                        <Stack direction="column" spacing={0.5} fontSize={12} mt={1}>
                            <Item name="Bucket" value={media?.bucket_name} />
                            <Item name="Path" value={media?.path} />
                            <Item name="URL" value={makeImageUrl(media?.path)} />
                        </Stack>
                    </Box>

                    <Box border={1} borderColor="divider" p={2} mt={2}>
                        <Typography variant="subtitle1" fontWeight={600}>Upload Details</Typography>
                        <Stack direction="column" spacing={0.5} fontSize={12} mt={1}>
                            <Item name="Name" value={media?.uploaded_by?.first_name + ' ' + media?.uploaded_by?.last_name} />
                            <Item name="Role" value={media?.uploaded_by?.role} />
                            <Item name="Uploaded On" value={formatDate(media?.created_at)} />
                        </Stack>
                    </Box>
                </Box>
            </OverlayScrollbar>
        </Drawer>
    );
}

const Item = ({ name, value }: { name: string; value: string | number }) => {
    return (
        <Box display="flex">
            <Typography variant="subtitle2" fontWeight={500} minWidth={100}>
                {name}:
            </Typography>
            <Typography variant="subtitle2" fontWeight={500} flex={1} sx={{ wordBreak: 'break-word' }}>
                {value}
            </Typography>
        </Box>
    );
}