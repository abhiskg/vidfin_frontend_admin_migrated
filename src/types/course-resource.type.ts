import { z } from "zod";

export const courseResourceSchema = z.object({
  resource_id: z.number(),
  admin_id: z.number(),
  section_id: z.number(),
  course_id: z.number(),
  chapter_id: z.number(),
  resource_title: z.string(),
  file_type: z.string(),
  resource_file: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  section: z.object({
    section_id: z.number(),
    section_title: z.string(),
  }),
  chapter: z.object({
    chapter_id: z.number(),
    chapter_title: z.string(),
  }),
});

export type ICourseResource = z.infer<typeof courseResourceSchema>;

export const courseResourceFormSchema = z.object({
  section_id: z.string().min(1, "Section is required"),

  chapter_id: z.string().min(1, "Chapter is required"),

  resource_title: z
    .string()
    .min(1, "Resource title can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Resource title can't be empty"),

  file: z
    .instanceof(FileList, { message: "File is required" })
    .refine((value) => value.length > 0, "File is required"),
});

export type ICourseResourceForm = z.infer<typeof courseResourceFormSchema>;

export const courseResourceEditFormSchema = z.object({
  section_id: z
    .string()
    .min(1, "Section is required")
    .refine((value) => !/^\s*$/.test(value), "Section is required"),

  chapter_id: z
    .string()
    .min(1, "Chapter is required")
    .refine((value) => !/^\s*$/.test(value), "Chapter is required"),

  resource_title: z
    .string()
    .min(1, "Resource title can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Resource title can't be empty"),

  file: z.any().optional(),
});

export type ICourseResourceEditForm = z.infer<
  typeof courseResourceEditFormSchema
>;
