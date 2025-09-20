import Box from '@mui/material/Box';
import type { PaperProps } from '@mui/material/Paper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import type { FileRejection } from 'react-dropzone';

import { fData } from '@/utils/format-number';
import { fileData } from '@/utils/media-file';

// ----------------------------------------------------------------------

type RejectionFilesProps = PaperProps & {
    files: FileRejection[];
};

export function RejectionFiles({ files, sx, ...other }: RejectionFilesProps) {
    if (!files.length) {
        return null;
    }

    return (
        <Paper
            variant="outlined"
            sx={{
                py: 1,
                px: 2,
                mt: 3,
                textAlign: 'left',
                borderStyle: 'dashed',
                borderColor: 'error.main',
                bgcolor: 'error.main',
                ...sx,
            }}
            {...other}
        >
            {files.map(({ file, errors }) => {
                const { path, size } = fileData(file);

                return (
                    <Box key={path} sx={{ my: 1 }}>
                        <Typography variant="subtitle2" noWrap>
                            {path} - {size ? fData(size) : ''}
                        </Typography>

                        {errors.map((error) => (
                            <Box key={error.code} component="span" sx={{ typography: 'caption' }}>
                                - {error.message}
                            </Box>
                        ))}
                    </Box>
                );
            })}
        </Paper>
    );
}