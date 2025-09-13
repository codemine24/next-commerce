'use client';

import { AlertColor } from '@mui/material';

type ToastFn = (message: string) => void;

type ToastStore = {
    success: ToastFn;
    error: ToastFn;
    warning: ToastFn;
    info: ToastFn;
    _setHandler: (fn: ToastHandler) => void;
};

type ToastHandler = (msg: string, severity: AlertColor) => void;

// Default no-op until replaced by provider
let toastHandler: ToastHandler = () => { };

export const toast: ToastStore = {
    success: (msg) => toastHandler(msg, 'success'),
    error: (msg) => toastHandler(msg, 'error'),
    warning: (msg) => toastHandler(msg, 'warning'),
    info: (msg) => toastHandler(msg, 'info'),
    _setHandler: (fn) => {
        toastHandler = fn;
    },
};