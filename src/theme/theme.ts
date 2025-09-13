import { createTheme } from "@mui/material/styles";

import { components } from "./components";
import { colorPalette } from "./palette";
import { shape } from "./shape";
import { typography } from "./typography";

export const theme = createTheme({
  palette: colorPalette,
  typography,
  shape,
  components,
});
