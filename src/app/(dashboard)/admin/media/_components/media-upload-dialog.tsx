import Button from '@mui/material/Button';
import type { DialogProps } from '@mui/material/Dialog';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useState, useCallback } from 'react';

import { uploadFiles } from '@/actions/file';
import { UploadCloudIcon } from '@/icons/upload-cloud';
import { toast } from '@/lib/toast-store';

import { Uploader } from './uploader/uploader';

// ----------------------------------------------------------------------

interface MediaUploadDialogProps extends DialogProps {
    open: boolean;
    title?: string;
    folderName?: string;
    onClose: () => void;
    onCreate?: () => void;
    onUpdate?: () => void;
    onChangeFolderName?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export function MediaUploadDialog(props: MediaUploadDialogProps) {
    const { open, onClose, onCreate, onUpdate, folderName, onChangeFolderName, title, ...other } = props;
    const [files, setFiles] = useState<(File | string)[]>([]);
    const [loading, setLoading] = useState(false);

    const handleDrop = useCallback(
        (acceptedFiles: File[]) => {
            setFiles([...files, ...acceptedFiles]);
        },
        [files]
    );

    const handleClose = () => {
        onClose();
        setFiles([]);
    };

    const handleUpload = async () => {
        if (!files.length) {
            handleClose();
            return;
        }

        setLoading(true);
        const formData = new FormData();

        files.forEach(file => formData.append("files", file));

        const res = await uploadFiles(formData);

        if (!res.success) {
            toast.error(res.message);
        } else {
            toast.success("Files uploaded successfully");
        }

        setLoading(false);
        handleClose();
    };

    const handleRemoveFile = (inputFile: File | string) => {
        const filtered = files.filter((file) => file !== inputFile);
        setFiles(filtered);
    };

    const handleRemoveAllFiles = () => {
        setFiles([]);
    };

    return (
        <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} {...other}>
            <DialogTitle sx={{ p: 2, bgcolor: "background.default" }}> {title}</DialogTitle>

            <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none', bgcolor: "background.default" }}>
                {(onCreate || onUpdate) && (
                    <TextField
                        fullWidth
                        label="Folder name"
                        value={folderName}
                        onChange={onChangeFolderName}
                        sx={{ mb: 3 }}
                    />
                )}

                {/* Upload Area */}
                <Uploader
                    multiple
                    accept={{ 'image/*': [] }}
                    value={files}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
                />
            </DialogContent>

            {/* Dialog Actions */}
            <DialogActions sx={{ px: 2, py: 2, bgcolor: "background.default" }}>
                {!!files.length && (
                    <Button
                        variant="outlined"
                        disabled={loading}
                        color="error"
                        onClick={handleRemoveAllFiles}
                    >
                        Remove all
                    </Button>
                )}

                <Button
                    variant="contained"
                    onClick={handleUpload}
                    disabled={loading}
                    startIcon={files.length && <UploadCloudIcon />}
                >
                    {files.length ? loading ? 'Uploading...' : 'Upload' : 'Cancel'}
                </Button>

                {(onCreate || onUpdate) && (
                    <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
                        <Button variant="soft" onClick={onCreate || onUpdate}>
                            {onUpdate ? 'Save' : 'Create'}
                        </Button>
                    </Stack>
                )}
            </DialogActions>
        </Dialog>
    );
}