import Fade from "@mui/material/Fade";
import { TransitionProps } from "@mui/material/transitions";
import { forwardRef } from "react";

export const FadeTransition = forwardRef(function FadeTransition(
    props: TransitionProps & { children: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Fade ref={ref} {...props} />;
});
