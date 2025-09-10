'use client'

import { AlertColor } from '@mui/material';
import Alert from '@mui/material/Alert';
import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import React, { createContext, useState, useCallback, useContext } from 'react';

// Slide transition
const SlideTransition = (props: SlideProps) => {
    return <Slide {...props} direction="down" />;
}


interface ToastContextProps {
    success: (message: string) => void;
    error: (message: string) => void;
    warning: (message: string) => void;
    info: (message: string) => void;
}

const ToastContext = createContext<ToastContextProps | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('info');

    const showMessage = useCallback((msg: string, severity: AlertColor = 'info') => {
        setMessage(msg);
        setSeverity(severity);
        setOpen(true);
    }, []);

    const success = (msg: string) => showMessage(msg, 'success');
    const error = (msg: string) => showMessage(msg, 'error');
    const warning = (msg: string) => showMessage(msg, 'warning');
    const info = (msg: string) => showMessage(msg, 'info');

    const handleClose = () => setOpen(false);

    return (
        <ToastContext.Provider value={{ success, error, warning, info }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                slots={{ transition: SlideTransition }}
            >
                <Alert severity={severity} onClose={handleClose} variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};