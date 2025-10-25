import { SvgIconProps } from "@mui/material";
import { SvgIcon } from "@mui/material";

export const SadIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon {...props}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <g fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" d="M7.881 16.244c.493-.427 1.142-.735 1.842-.937A8.3 8.3 0 0 1 12 15c.786 0 1.57.103 2.277.307c.7.202 1.35.51 1.842.937" />
                    <circle cx="9" cy="10" r="1.25" fill="currentColor" strokeWidth="0.5" />
                    <circle cx="15" cy="10" r="1.25" fill="currentColor" strokeWidth="0.5" />
                </g>
            </svg>
        </SvgIcon>
    );
};