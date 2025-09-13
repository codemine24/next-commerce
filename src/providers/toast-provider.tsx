'use client';

import { AlertColor } from '@mui/material';
import Alert from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import React, { useState, useCallback, useEffect } from 'react';

import { toast } from '@/lib/toast-store';

const SlideTransition = (props: SlideProps) => {
    return <Slide {...props} direction="down" />;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('info');

    const showMessage = useCallback((msg: string, severity: AlertColor = 'info') => {
        setMessage(msg);
        setSeverity(severity);
        setOpen(true);
    }, []);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        toast._setHandler(showMessage);
    }, [showMessage]);

    return (
        <>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                TransitionComponent={SlideTransition}
            >
                <Alert severity={severity} onClose={handleClose} variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </>
    );
};