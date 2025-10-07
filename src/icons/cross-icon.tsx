import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const CrossIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          fillRule="evenodd"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          transform="translate(2 2)"
          strokeWidth="1"
        >
          <circle cx="8.5" cy="8.5" r="8" />
          <path d="m5.5 5.5l6 6m0-6l-6 6" />
        </g>
      </svg>
    </SvgIcon>
  );
};
