import { common } from "@mui/material/colors";
import { alpha, Components, Theme } from "@mui/material/styles";

import { colorPalette } from "./palette";

// ========================================================

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    dark: true;
    paste: true;
    marron: true;
    orange: true;
  }

  interface ButtonPropsSizeOverrides {
    normal: true;
  }

  interface ButtonPropsVariantOverrides {
    soft: true;
  }
}
// =========================================================

export const components: Components<Theme> = {
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollBehavior: "smooth",
      },
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        scrollBehavior: "smooth",
      },

      a: {
        color: "inherit",
        textDecoration: "none",
      },
      ul: {
        margin: 0,
        padding: 0,
        listStyle: "none",
      },
      ".bg-white": {
        backgroundColor: "white",
      },
    },
  },

  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 12,
        boxShadow: "none",
      },
    },
  },
  MuiPagination: {
    defaultProps: {
      color: "primary",
      shape: "rounded",
      variant: "outlined",
    },
  },
  MuiPaginationItem: {
    styleOverrides: {
      rounded: { borderRadius: 8 },
      outlined: { borderColor: colorPalette.divider },
    },
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        paddingTop: 8,
        paddingBottom: 8,
      },
    },
  },
  MuiSvgIcon: {
    styleOverrides: {
      root: {
        "& .secondary": { opacity: 0.4 },
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      size: "small",
      variant: "outlined",
    },
  },
  MuiInputLabel: {
    styleOverrides: {
      root: { zIndex: 0 },
      sizeSmall: { lineHeight: "1.8em" },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: { borderRadius: 0, fontSize: 15 },
      sizeSmall: { lineHeight: "1.8em" },
      inputSizeSmall: { height: "1.8em" },
      notchedOutline: { borderColor: colorPalette.divider },
    },
  },
  MuiFormHelperText: {
    styleOverrides: {
      root: { marginLeft: 0 },
    },
  },
  MuiButton: {
    variants: [
      {
        props: { color: "dark" },
        style: {
          color: "#fff",
          transition: "all 0.3s",
          backgroundColor: colorPalette.divider,
          // ":hover": { backgroundColor: colorPalette.divider },
        },
      },
      {
        props: {
          variant: "outlined",
        },
        style: {
          borderRadius: 0,
          transition: "all 0.3s",
          // backgroundColor: "transparent",
          // ":hover": { backgroundColor: colorPalette.divider },
        },
      },
      {
        props: {
          variant: "contained",
        },
        style: {
          backgroundColor: "primary.main",
          color: common.white,
          borderRadius: 0,
          transition: "all 0.3s",
          ":hover": { backgroundColor: colorPalette.secondary },
        },
      },
      {
        props: { variant: "soft", color: "primary" },
        style: ({ theme }) => ({
          backgroundColor: alpha((theme.palette.primary as unknown as { [key: string]: string })["100"], 0.1),
          color: theme.palette.primary.dark,
          borderRadius: 0,
          transition: "all 0.3s",
          ":hover": {
            backgroundColor: alpha((theme.palette.primary as unknown as { [key: string]: string })["100"], 0.2),
            color: common.white,
          },
        }),
      },
    ],
    defaultProps: { color: "inherit" },
    styleOverrides: {
      sizeSmall: { borderRadius: 6 },
      sizeMedium: { borderRadius: 8 },
      sizeLarge: {
        padding: ".6rem 2.5rem",
        borderRadius: 12,
      },
      root: {
        minWidth: 0,
        minHeight: 0,
        fontWeight: 500,
        textTransform: "capitalize",
      },
    },
  },
  MuiChip: {
    defaultProps: { color: "primary" },
    styleOverrides: {
      labelSmall: { paddingInline: 12 },
      colorSuccess: {
        color: "#007074",
        backgroundColor: "#007074",
      },
      colorSecondary: {
        color: "#007074",
        backgroundColor: "#007074",
      },
    },
  },

  MuiBackdrop: {
    styleOverrides: {
      invisible: { background: "transparent", backdropFilter: "none" },
      root: {
        backdropFilter: "blur(4px)",
        background:
          "-webkit-linear-gradient(90deg, rgba(75, 85, 99, 0.8) 0%, rgba(55, 65, 81, 0.4) 100%)",
      },
    },
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        borderRadius: 12,
      },
    },
  },
  MuiAvatar: {
    styleOverrides: {
      rounded: {
        borderRadius: 12,
      },
    },
  },
  MuiPopover: {
    defaultProps: { elevation: 5 },
    styleOverrides: {
      paper: {
        borderRadius: 8,
        marginTop: 4,
      },
    },
  },
  MuiSlider: {
    styleOverrides: {
      valueLabel: {
        borderRadius: 8,
      },
    },
  },
  MuiRating: {
    styleOverrides: {
      sizeSmall: {
        fontSize: 16,
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: "6px",
        // cursor: "pointer",
        position: "relative",
        boxShadow: "0px 1px 3px rgba(3, 0, 71, 0.09)",
        transition: "all 0.2s ease-in-out",
        // ":hover": {
        //   boxShadow:
        //     "rgba(43, 52, 69, 0.05) 0px 0px 24px 0px, rgba(43, 52, 69, 0.05) 0px 3px 6px 0px",
        // },
        backgroundColor: "background.paper",
      },
    },
  },
};
