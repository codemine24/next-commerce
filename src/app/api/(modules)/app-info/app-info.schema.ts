import z from "zod";

import { hexColorRegex } from "../../(helpers)/constants/common";

const appInfoFields = {
  name: z
    .string({ error: "Name is required" })
    .min(2, "Name must be at least 2 characters long")
    .max(100, "Name must not exceed 100 characters"),
  logo: z
    .string({ error: "Logo should be a valid path" })
    .min(1, "Logo path is required"),
  secondary_logo: z
    .string({ error: "Secondary logo should be a valid path" })
    .min(1, "Secondary logo path is required")
    .optional(),
  title: z
    .string({ error: "Title should be a text" })
    .min(2, "Title is required"),
  primary_color: z
    .string()
    .regex(
      hexColorRegex,
      "Primary color must be a valid hex color (e.g. #FFFFFF)"
    ),
  secondary_color: z
    .string()
    .regex(
      hexColorRegex,
      "Secondary color must be a valid hex color (e.g. #000000)"
    )
    .optional(),
};

// ------------------------------------ SET APP INFO -------------------------------------
const setAppInfo = z.object({
  body: z.object(appInfoFields).strict(),
});

// ------------------------------------ UPDATE APP INFO ----------------------------------
const updateAppInfo = z.object({
  body: z.object(appInfoFields).partial().strict(),
});

export const AppInfoSchemas = {
  setAppInfo,
  updateAppInfo,
};
