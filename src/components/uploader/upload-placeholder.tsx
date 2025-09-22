import type { BoxProps } from '@mui/material/Box';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { MediaIcon } from '@/icons/media';

// ----------------------------------------------------------------------
type Props = BoxProps & {
    showSubHeading?: boolean;
};
export function UploadPlaceholder({ sx, showSubHeading = true, ...other }: Props) {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            sx={sx}
            {...other}
        >
            <MediaIcon sx={{ height: 100, width: 100, color: 'primary.main' }} />

            <Stack spacing={1} sx={{ textAlign: 'center' }}>
                <Box sx={{ typography: 'h6' }}>Drop or select image</Box>
                {showSubHeading && (
                    <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
                        Drop images here or click to
                        <Box
                            component="span"
                            sx={{ mx: 0.5, color: 'primary.main', textDecoration: 'underline' }}
                        >
                            browse
                        </Box>
                        through your machine.
                    </Box>
                )}
                <Box sx={{ typography: 'body2', color: 'text.secondary' }}>
                    Allowed only *.webp, *.jpeg, *.jpg, *.png, *.gif, *.ico, *.svg
                </Box>
            </Stack>
        </Box>
    );
}

type ImageSelectPlaceholderProps = BoxProps & {
    heading?: string;
    subHeading?: string;
};
export function ImageSelectPlaceholder({
    heading = 'Drop or select image',
    subHeading,
    sx,
    ...other
}: ImageSelectPlaceholderProps) {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            sx={{
                ...sx,
                px: 2,
                pt: 2,
                pb: 6,
                '&:hover': { opacity: 0.72 },
            }}
            {...other}
        >
            <MediaIcon sx={{ width: 200 }} />

            <Stack spacing={1} sx={{ textAlign: 'center' }}>
                <Box sx={{ typography: 'h6' }}>{heading}</Box>
                {subHeading && (
                    <Box sx={{ typography: 'body2', color: 'text.secondary' }}>{subHeading}</Box>
                )}
            </Stack>
        </Box>
    );
}