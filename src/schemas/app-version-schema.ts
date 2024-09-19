import { z } from "zod";

export const appVersionFormSchema = z.object({
  min_version: z
    .string()
    .min(1, "Least android version can't be empty")
    .refine((val) => /^\d+(\.\d+)?(\.\d+)?$/.test(val), {
      message: "Least Version has to be a number",
    }),
  upgrade_version: z
    .string()
    .min(1, "Updated android version can't be empty")
    .refine((val) => /^\d+(\.\d+)?(\.\d+)?$/.test(val), {
      message: "Updated version has to be a number",
    }),

  min_ios_version: z
    .string()
    .min(1, "Least iOS version can't be empty")
    .refine((val) => /^\d+(\.\d+)?(\.\d+)?$/.test(val), {
      message: "Least Version has to be a number",
    }),

  upgrade_ios_version: z
    .string()
    .min(1, "Updated iOS Version can't be empty")
    .refine((val) => /^\d+(\.\d+)?(\.\d+)?$/.test(val), {
      message: "Updated version has to be a number",
    }),
});
