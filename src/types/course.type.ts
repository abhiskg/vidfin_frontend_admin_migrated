import { z } from "zod";

export const courseSchema = z.object({
  similer_courses: z.array(z.string()),
  tags: z.array(z.string()).nullable(),
  available_for_plans: z.array(z.string()),
  course_id: z.number(),
  admin_id: z.number(),
  course_slug_identifier: z.null(),
  course_name: z.string(),
  creator_name: z.string(),
  label: z.string(),
  language: z.string(),
  subtitle: z.string(),
  purchase: z.string(),
  course_preview_type: z.string(),
  preview_thumbnail: z.string(),
  preview_thumbnail_original: z.string().nullable(),
  summary: z.string(),
  what_you_learn: z.string(),
  description: z.string(),
  about: z.string(),
  status: z.string(),
  domain_as_slug: z.string(),
  videoid: z.string().nullable(),
  playbackInfo: z.string().nullable(),
  total_views: z.number(),
  preview_file_name: z.string().nullable(),
  slug: z.string(),
  thumbnail_file_name: z.string().nullable(),
  has_chapter: z.number(),
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

export type ICourse = z.infer<typeof courseSchema>;

export const courseFormSchema = z.object({
  course_name: z
    .string()
    .min(1, "Title can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Title can't be empty"),

  creator_name: z
    .string()
    .min(1, "Author can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Author can't be empty"),

  summary: z
    .string()
    .min(1, "Description can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Description can't be empty"),

  what_you_learn: z
    .string()
    .min(1, "What you learn can't be empty")
    .refine((value) => !/^\s*$/.test(value), "What you learn can't be empty")
    .refine(
      (value) => !/^<p>\s*<\/p>$/.test(value),
      "What you learn can't be empty",
    ),

  description: z
    .string()
    .min(1, "Description can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Description can't be empty")
    .refine(
      (value) => !/^<p>\s*<\/p>$/.test(value),
      "Description can't be empty",
    ),

  about: z
    .string()
    .min(1, "About can't be empty")
    .refine((value) => !/^\s*$/.test(value), "About can't be empty")
    .refine((value) => !/^<p>\s*<\/p>$/.test(value), "About can't be empty"),

  language: z.string().min(1, "Language can't be empty"),
  subtitle: z.string().min(1, "Subtitle can't be empty"),

  tags: z.string().optional(),

  similer_courses: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional(),

  slug: z
    .string()
    .min(1, "Slug can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Slug can't be empty"),

  available_for_plans: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),

  preview_thumbnail: z
    .instanceof(FileList, { message: "Image is required" })
    .refine((value) => value.length > 0, { message: "Image is required" })
    .refine((value) => value[0].type.includes("image"), {
      message: "Image must be an image",
    })
    .refine((value) => value[0].size < 5000000, {
      message: "Image size must be less than 5mb",
    }),

  videoid: z.string().optional(),
});

export type ICourseForm = z.infer<typeof courseFormSchema>;

export const courseEditFormSchema = z.object({
  course_name: z
    .string()
    .min(1, "Title can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Title can't be empty"),

  creator_name: z
    .string()
    .min(1, "Author can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Author can't be empty"),

  summary: z
    .string()
    .min(1, "Description can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Description can't be empty"),

  what_you_learn: z
    .string()
    .min(1, "What you learn can't be empty")
    .refine((value) => !/^\s*$/.test(value), "What you learn can't be empty")
    .refine(
      (value) => !/^<p>\s*<\/p>$/.test(value),
      "What you learn can't be empty",
    ),

  description: z
    .string()
    .min(1, "Description can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Description can't be empty")
    .refine(
      (value) => !/^<p>\s*<\/p>$/.test(value),
      "Description can't be empty",
    ),

  about: z
    .string()
    .min(1, "About can't be empty")
    .refine((value) => !/^\s*$/.test(value), "About can't be empty")
    .refine((value) => !/^<p>\s*<\/p>$/.test(value), "About can't be empty"),

  language: z.string().min(1, "Language can't be empty"),
  subtitle: z.string().min(1, "Subtitle can't be empty"),

  tags: z.string().optional(),

  similer_courses: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional(),

  slug: z
    .string()
    .min(1, "Slug can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Slug can't be empty"),

  available_for_plans: z.array(z.string()).optional(),

  preview_thumbnail: z.any().optional(),

  videoid: z.string().optional(),
  categories: z.array(z.string()).optional(),
});

export type ICourseEditForm = z.infer<typeof courseEditFormSchema>;
