import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const ExpandMoreIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon {...props}>
            <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m4 8l8 8l8-8"
            />
        </SvgIcon>
    );
};