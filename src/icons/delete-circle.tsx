import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export const DeleteCircle = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={50}
        height={50}
        viewBox="0 0 50 50"
      >
        <path
          fill="currentColor"
          d="M25 42c-9.4 0-17-7.6-17-17S15.6 8 25 8s17 7.6 17 17s-7.6 17-17 17m0-32c-8.3 0-15 6.7-15 15s6.7 15 15 15s15-6.7 15-15s-6.7-15-15-15"
        ></path>
        <path
          fill="currentColor"
          d="m32.283 16.302l1.414 1.415l-15.98 15.98l-1.414-1.414z"
        ></path>
        <path
          fill="currentColor"
          d="m17.717 16.302l15.98 15.98l-1.414 1.415l-15.98-15.98z"
        ></path>
      </svg>
    </SvgIcon>
  );
};
