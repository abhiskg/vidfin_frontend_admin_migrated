import { z } from "zod";

const courseChapterSchema = z.object({
  chapter_id: z.number(),
  section_id: z.number(),
  chapter_title: z.string(),
  content_file: z.string().nullable(),
  content_type: z.string(),
  thumbnail_original: z.string().nullable(),
  link: z.string().nullable(),
  subtitle_file: z.string().nullable(),
  subtitle_kind: z.string(),
  subtitle_src_lang: z.string(),
  subtitle_label: z.string(),
  available_non_subscriber: z.string().nullable(),
  playbackInfo: z.string().nullable(),
  videoid: z.string(),
  subtitle_id: z.string(),
  mediaId: z.string().nullable(),
  duration: z.number(),
  status: z.number(),
  free_chapter: z.number(),
  file_name: z.string().nullable(),
  thumbnail_file_name: z.string().nullable(),
  subtitle_file_name: z.string().nullable(),
  is_deleted: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ICourseChapter = z.infer<typeof courseChapterSchema>;

export const courseSectionSchema = z.object({
  section_id: z.number(),
  course_id: z.number(),
  section_title: z.string(),
  section_status: z.number(),
  is_deleted: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  chapters: z.array(courseChapterSchema),
});

export type ICourseSection = z.infer<typeof courseSectionSchema>;

export const courseSectionFormSchema = z.object({
  section_title: z
    .string()
    .min(1, "Section title can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Section title can't be empty"),
});

export type ICourseSectionForm = z.infer<typeof courseSectionFormSchema>;

export const courseChapterFormSchema = z.object({
  chapter_title: z
    .string()
    .min(1, "Chapter title can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Chapter title can't be empty"),

  videoid: z
    .string()
    .min(1, "Chapter video id can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Chapter video id can't be empty"),

  available_non_subscriber: z.string(),
});

export type ICourseChapterForm = z.infer<typeof courseChapterFormSchema>;
