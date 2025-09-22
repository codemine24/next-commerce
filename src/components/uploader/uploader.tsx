import { SxProps, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import Image from 'next/image';
import { DropzoneOptions, useDropzone } from 'react-dropzone';

import { CloseIcon } from '@/icons/close';
import { fData } from '@/utils/format-number';
import { fileData } from '@/utils/media-file';

import { UploadPlaceholder } from './upload-placeholder';
import { RejectionFiles } from './upload-rejection-file';

export interface UploaderProps extends DropzoneOptions {
    error?: boolean;
    sx?: SxProps<Theme>;
    className?: string;
    placeholder?: React.ReactNode;
    value?: (File | string)[];
    onRemove?: (file: File | string) => void;
    showSubHeading?: boolean;
};

export const Uploader = ({
    sx,
    value,
    error,
    disabled,
    onRemove,
    multiple = true,
    accept = {},
    showSubHeading = true,
    ...other
}: UploaderProps) => {
    const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
        multiple,
        disabled,
        accept,
        ...other,
    });

    const hasFile = !!value;
    const hasError = isDragReject || !!error;

    return (
        <Box sx={{ position: 'relative' }}>
            {/* Dropzone */}
            <Box
                {...getRootProps()}
                sx={{
                    p: 5,
                    mb: 2,
                    height: 200,
                    outline: 'none',
                    borderRadius: 1,
                    cursor: 'pointer',
                    overflow: 'hidden',
                    position: 'relative',
                    bgcolor: "background.paper",
                    border: 1,
                    borderColor: "divider",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: (theme) => theme.transitions.create(['opacity', 'padding']),
                    '&:hover': { opacity: 0.72 },
                    ...(isDragActive && { opacity: 0.72 }),
                    ...(disabled && { opacity: 0.48, pointerEvents: 'none' }),
                    ...(hasError && {
                        color: 'error.main',
                        borderColor: 'error.main',
                        bgcolor: "error.main",
                    }),
                    ...(hasFile && { padding: '28% 0' }),
                    ...sx
                }}
            >
                <input {...getInputProps()} />

                <UploadPlaceholder showSubHeading={showSubHeading} />
            </Box>

            {/* Uploaded files list */}
            <Box display="flex" flexDirection="column" gap={1}>
                {Array.isArray(value) && value?.length > 0 && value?.map((file) => {
                    const { name, size } = fileData(file);

                    return (
                        <Box
                            component="li"
                            key={name}
                            px={1}
                            py={0.5}
                            gap={2}
                            display="flex"
                            borderRadius={1}
                            alignItems="center"
                            border={1}
                            borderColor="divider"
                        >
                            <Image
                                src={URL.createObjectURL(file as File) as string}
                                alt={fileData(file).name || ''}
                                width={36}
                                height={36}
                                objectFit="contain"
                            />

                            <ListItemText
                                primary={name}
                                secondary={fData(size)}
                                slotProps={{
                                    primary: {
                                        noWrap: false,
                                        sx: {
                                            whiteSpace: 'normal',
                                            wordBreak: 'break-word',
                                        },
                                    },
                                    secondary: { component: 'span', typography: 'caption' },
                                }}
                            />

                            {onRemove && (
                                <IconButton size="small" onClick={() => onRemove(file)}>
                                    <CloseIcon />
                                </IconButton>
                            )}
                        </Box>
                    );
                })}

                <RejectionFiles files={[...fileRejections]} />
            </Box>
        </Box>
    );
}