import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const ChevronLeftIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z" /></svg>
        </SvgIcon>
    );
};