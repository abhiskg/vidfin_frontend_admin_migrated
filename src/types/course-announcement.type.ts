import { z } from "zod";

export const courseAnnouncementSchema = z.object({
  id: z.number(),
  admin_id: z.number(),
  course_id: z.number(),
  heading: z.string(),
  announcement: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ICourseAnnouncement = z.infer<typeof courseAnnouncementSchema>;

export const courseAnnouncementFormSchema = z.object({
  announcement: z
    .string()
    .min(1, "Title can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Title can't be empty"),
});

export type ICourseAnnouncementForm = z.infer<
  typeof courseAnnouncementFormSchema
>;
