import { style } from "@vanilla-extract/css";
import { themeVars } from "uiv2/css/themeContract.css";

export const simulateAssetChangeError = style({
  width: "100%",
});
export const assetChangeSection = style({
  display: "flex",
  gap: themeVars.space["2x"],
  flexDirection: "column",
  justifyContent: "flex-start",
});
