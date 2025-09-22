import { SvgIcon, SvgIconProps } from "@mui/material";

export const BrandIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><path strokeLinecap="round" d="m8.534 14l-4.5-8M11.5 21.5l4-7.5M12 8h9" /></g></svg>
        </SvgIcon>
    );
};
