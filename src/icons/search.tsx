import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const SearchIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon {...props}>
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 11.5a7.5 7.5 0 1 1-15 0a7.5 7.5 0 0 1 15 0m-2.107 5.42l3.08 3.08" />
        </SvgIcon>
    );
};