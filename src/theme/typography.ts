import { TypographyVariantsOptions } from "@mui/material/styles";

export const typography: TypographyVariantsOptions = {
  fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontSize: "32px",
    fontWeight: 600,
    lineHeight: "32px",
    verticalAlign: "middle",
    letterSpacing: "0px",
  },
  h2: {
    fontSize: "28px",
    fontWeight: 400,
    lineHeight: "28px",
    letterSpacing: "0px",
  },
  h3: {
    fontSize: "24px",
    fontWeight: 500,
    lineHeight: "22px",
    letterSpacing: "0px",
  },
  h4: { fontSize: "20px", fontWeight: 400 },
  h5: { fontSize: "18px", fontWeight: 400 },
  h6: {
    fontSize: "14px",
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: "14px",
  },
  body1: { fontSize: "1.1rem", fontWeight: 400 },
  body2: {
    fontSize: "14px",
    fontWeight: 400,
    lineHeight: "16px",
    letterSpacing: "0px",
  },
  button: { fontSize: "0.875rem", fontWeight: 500 },
};
