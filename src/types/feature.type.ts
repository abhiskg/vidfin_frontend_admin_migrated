import { z } from "zod";

const featureCoursesSchema = z.object({
  id: z.number(),
  position: z.string().or(z.number()),
  course: z
    .object({
      course_name: z.string(),
      course_id: z.number(),
    })
    .nullable(),
});

const featureInsightsSchema = z.object({
  id: z.number(),
  position: z.string().or(z.number()),
  insights: z
    .object({
      insight_title: z.string(),
      insight_id: z.number(),
    })
    .nullable(),
});

export const featureSchema = z.object({
  category_id: z.number(),
  admin_id: z.string(),
  category_name: z.string(),
  category_source: z.string(),
  category_type: z.string(),
  priority: z.number(),
  courses_limit: z.number().nullable(),
  range_start: z.string().nullable(),
  range_end: z.string().nullable(),
  status: z.string(),
  courses: z.array(featureCoursesSchema),
  insights: z.array(featureInsightsSchema),
  created_at: z.string(),
  updated_at: z.string(),
});

export type IFeature = z.infer<typeof featureSchema>;

export const featureFormSchema = z
  .object({
    category_name: z
      .string()
      .min(1, "Category name can't be empty")
      .refine((value) => !/^\s*$/.test(value), "Category name can't be empty"),
    category_source: z.string().min(1, "Category source can't be empty"),
    course_ids: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ),
    insight_ids: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
      }),
    ),
  })
  .refine(
    (data) =>
      (data.category_source === "courses" && data.course_ids.length > 0) ||
      (data.category_source === "insights" && data.insight_ids.length > 0),
    {
      message: "Course ids is required",
      path: ["course_ids"],
    },
  )
  .refine(
    (data) =>
      (data.category_source === "insights" && data.insight_ids.length > 0) ||
      (data.category_source === "courses" && data.course_ids.length > 0),
    {
      message: "Insight ids is required",
      path: ["insight_ids"],
    },
  );

export type IFeatureForm = z.infer<typeof featureFormSchema>;
