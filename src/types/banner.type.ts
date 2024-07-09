import { z } from "zod";

export const bannerSchema = z.object({
  banner_id: z.number(),
  admin_id: z.number(),
  banner_type: z.string(),
  banner_title: z.string(),
  start_date: z.string().nullable(),
  end_date: z.string().nullable(),
  text_over_banner: z.string(),
  banner_file_type: z.string(),
  banner_file: z.string(),
  banner_file_original: z.string().nullable(),
  banner_file_mobile: z.string().nullable(),
  banner_file_name: z.string(),
  item_type: z.string(),
  item_id: z.number(),
  click_url: z.string(),
  views: z.string(),
  status: z.string(),
  priority: z.number(),
  device_type: z.string(),
  is_deleted: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type IBanner = z.infer<typeof bannerSchema>;

export const bannerFormSchema = z
  .object({
    banner_type: z.string().min(1, "Banner type can't be empty"),
    start_date: z.string().min(1, "Start date can't be empty").or(z.date()),
    end_date: z.string().min(1, "End date can't be empty").or(z.date()),
    banner_file_type: z.string().optional(),
    banner_file: z.any().optional(),
    banner_file_mobile: z.any().optional(),
    device_type: z.string().min(1, "Device type can't be empty"),
    item_type: z.string(),
    item_id: z.string(),
  })
  .refine(
    (data) =>
      data.banner_type === "empty" ||
      (data.banner_type === "normal" && data.item_type !== ""),
    {
      message: "Item type is required",
      path: ["item_type"],
    },
  )
  .refine(
    (data) =>
      data.banner_type === "empty" ||
      (data.banner_type === "normal" && data.item_type === "subscription") ||
      (data.banner_type === "normal" && data.item_id !== ""),
    {
      message: "Item id is required",
      path: ["item_id"],
    },
  );

export type IBannerForm = z.infer<typeof bannerFormSchema>;

export const bannerFormUpdateSchema = z
  .object({
    banner_type: z.string().min(1, "Banner type can't be empty"),
    start_date: z.string().min(1, "Start date can't be empty").or(z.date()),
    end_date: z.string().min(1, "End date can't be empty").or(z.date()),
    banner_file_type: z.string().optional(),
    banner_file: z.any().optional(),
    banner_file_mobile: z.any().optional(),
    device_type: z.string().min(1, "Device type can't be empty"),
    item_type: z.string(),
    item_id: z.string(),
  })
  .refine(
    (data) =>
      data.banner_type === "empty" ||
      (data.banner_type === "normal" && data.item_type !== ""),
    {
      message: "Item type is required",
      path: ["item_type"],
    },
  )
  .refine(
    (data) =>
      data.banner_type === "empty" ||
      (data.banner_type === "normal" && data.item_type === "subscription") ||
      (data.banner_type === "normal" && data.item_id !== ""),
    {
      message: "Item id is required",
      path: ["item_id"],
    },
  );

export type IBannerUpdateForm = z.infer<typeof bannerFormUpdateSchema>;
