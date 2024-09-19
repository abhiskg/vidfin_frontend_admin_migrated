import { z } from "zod";

export const insightSchema = z.object({
  tags: z.array(z.string()).nullable(),
  available_for_plans: z.array(z.string()),
  insight_id: z.number(),
  admin_id: z.number(),
  insight_title: z.string(),
  insight_desc: z.string(),
  author_name: z.string(),
  type: z.string(),
  domain_as_slug: z.string(),
  insight_type: z.number(),
  file: z.string().nullable(),
  subtitle_file: z.string().nullable(),
  thumbnail: z.string(),
  thumbnail_original: z.string().nullable(), //temp added
  video_availablity: z.string(),
  status: z.string(),
  is_deleted: z.string(),
  on_click: z.number(),
  video_url: z.null(),
  otp: z.string().nullable(),
  playbackInfo: z.string().nullable(),
  videoid: z.string(),
  subtitle_id: z.string().nullable(),
  preview_videoid: z.string().nullable(),
  preview_subtitle_id: z.string().nullable(),
  preview_file_duration: z.number(),
  mediaId: z.null(),
  duration: z.number(),
  insight_status: z.number(),
  total_views: z.number(),
  language: z.string(),
  video_status: z.number(),
  preview_video_status: z.number(),
  advertisement_item_type: z.string(),
  advertisement_item_id: z.number(),
  video_file_name: z.string().nullable(),
  preview_video_file_name: z.string().nullable(),
  subtitle_file_name: z.string().nullable(),
  thumbnail_file_name: z.string().nullable(),
  slug: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  categories: z
    .array(
      z.object({
        id: z.number(),
        category_id: z.number(),
      }),
    )
    .or(z.undefined()),
});

export type IInsight = z.infer<typeof insightSchema>;

export const insightFormSchema = z.object({
  insight_title: z
    .string()
    .min(1, "Title can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Title can't be empty"),

  insight_desc: z
    .string()
    .min(1, "Description can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Description can't be empty"),

  language: z.string().min(1, "Language can't be empty"),

  author_name: z.string().optional(),

  tags: z.string().optional(),

  type: z.string().min(1, "Category can't be empty"),

  slug: z
    .string()
    .min(1, "Slug can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Slug can't be empty"),

  available_for_plans: z.array(z.string()).optional(),

  preview_videoid: z.string().optional(),

  thumbnail: z
    .instanceof(FileList, { message: "Image is required" })
    .refine((value) => value.length > 0, { message: "Image is required" })
    .refine((value) => value[0].type.includes("image"), {
      message: "Image must be an image",
    })
    .refine((value) => value[0].size < 5000000, {
      message: "Image size must be less than 5mb",
    }),

  // .refine(
  //   (file) => acceptedImageTypes.includes(file?.[0]?.type),
  //   "Only image are allowed for thumbnail",

  videoid: z
    .string()
    .min(1, "Premium Video ID can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Premium Video ID can't be empty"),
  categories: z.array(z.string()).optional(),
});

export type IInsightForm = z.infer<typeof insightFormSchema>;

export const insightEditFormSchema = z.object({
  insight_title: z
    .string()
    .min(1, "Title can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Title can't be empty"),

  insight_desc: z
    .string()
    .min(1, "Description can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Description can't be empty"),

  language: z.string().min(1, "Language can't be empty"),

  author_name: z.string().optional(),

  tags: z.string().optional(),

  type: z.string().min(1, "Category can't be empty"),

  slug: z
    .string()
    .min(1, "Slug can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Slug can't be empty"),

  available_for_plans: z.array(z.string()).optional(),

  preview_videoid: z.string().optional(),

  thumbnail: z.any().optional(),

  videoid: z
    .string()
    .min(1, "Premium Video ID can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Premium Video ID can't be empty"),
  categories: z.array(z.string()).optional(),
});

export type IInsightEditForm = z.infer<typeof insightEditFormSchema>;
