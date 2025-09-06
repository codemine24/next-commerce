import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon"

export const SupportIcon = (props: SvgIconProps) => {
    return (
        <SvgIcon {...props}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"><path d="M6.502 5.004V.75M7 8.965c1 1 3 2.035 5.5 2.035m-9.783 2.491l.001-.826c.003-.79-.173-1.576-.589-2.249C1.374 9.194.75 8.392.75 6c0-2.222.792-3.738 2.244-4.55m8.636 7.775V8.62l.785-.02a.8.8 0 0 0 .658-.342c.515-.735-1.584-2.517-1.733-3.588c-.235-1.686-1.103-2.737-2.288-3.322M8.735 12.25v1.241" /><path d="M6.502 9c1.28 0 2-.72 2-2s-.72-2-2-2s-2 .72-2 2s.72 2 2 2" /></g></svg>
        </SvgIcon>
    )
}