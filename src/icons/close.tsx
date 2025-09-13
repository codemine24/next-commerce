import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const CloseIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 12L7 7m5 5l5 5m-5-5l5-5m-5 5l-5 5"
      />
    </SvgIcon>
  );
};
