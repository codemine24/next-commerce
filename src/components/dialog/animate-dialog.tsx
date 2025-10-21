"use client";

import { DialogProps, GrowProps, ZoomProps, FadeProps, SlideProps } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import Fade from '@mui/material/Fade';
import Grow from '@mui/material/Grow';
import Slide from '@mui/material/Slide';
import Zoom from '@mui/material/Zoom';

interface AnimatedDialogProps extends DialogProps {
    transition?: 'grow' | 'zoom' | 'fade' | 'slide';
}

const SlideTransition = (props: SlideProps) => {
    return <Slide timeout={500} {...props} />;
};

const GrowTransition = (props: GrowProps) => {
    return <Grow timeout={500} {...props} />;
};

const ZoomTransition = (props: ZoomProps) => {
    return <Zoom timeout={500} {...props} />;
};

const FadeTransition = (props: FadeProps) => {
    return <Fade timeout={500} {...props} />;
};

export const AnimatedDialog = ({
    transition = 'slide',
    ...props
}: AnimatedDialogProps) => {
    const transitions = {
        grow: GrowTransition,
        zoom: ZoomTransition,
        fade: FadeTransition,
        slide: SlideTransition,
    };

    const TransitionComponent = transitions[transition];

    return (
        <Dialog
            slots={{
                backdrop: Backdrop,
                transition: TransitionComponent
            }}
            {...props}
        />
    );
};