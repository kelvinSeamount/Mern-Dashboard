import { PaletteColorOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    tertiary: PaletteColor;
  }

  interface PaletteOptions {
    tertiary?: PaletteColorOptions;
  }

  interface PaletteColor {
    [key: number]: string;
  }

  interface SimplePaletteColorOptions {
    [key: number]: string;
  }
}
