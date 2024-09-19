import { z } from "zod";

export const subscriptionSchema = z.object({
  id: z.number(),
  admin_id: z.number(),
  title: z.string(),
  duration: z.string(),
  duration_type: z.string(),
  duration_in_days: z.number(),
  price: z.number(),
  description: z.string(),
  insight_gift: z.number(),
  plan_image: z.string(),
  plan_image_name: z.string(),
  subscriber: z.number(),
  status: z.enum(["published", "unpublished"]),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ISubscription = z.infer<typeof subscriptionSchema>;

export const subscriptionFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Title can't be empty"),
  price: z
    .string()
    .min(1, "Price can't be empty")
    .refine((val) => /^\d+$/.test(val), {
      message: "Price has to be a number",
    }),
  duration: z
    .string()
    .min(1, "Duration can't be empty")
    .refine((val) => /^\d+$/.test(val), {
      message: "Duration has to be a number",
    }),
  duration_type: z.string().min(1, "Duration Month can't be empty"),
  insight_gift: z.string().optional(),

  description: z
    .string()
    .min(1, "Description can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Description can't be empty")
    .refine(
      (value) => !/^<p>\s*<\/p>$/.test(value),
      "Description can't be empty",
    )
    .refine((value) => {
      return value.startsWith("<ul>") && value.endsWith("</ul>");
    }, "Description has to a bullet list")
    .refine((value) => {
      return !/^<ul><li><p><\/p><\/li><\/ul>$/.test(value);
    }, "Description can't be empty"),
});

export type ISubscriptionFormType = z.infer<typeof subscriptionFormSchema>;

export const subscriptionFreeTrailFormSchema = z.object({
  is_status: z.string().min(1, "Status can't be empty"),
  value: z
    .string()
    .min(1, "Duration is required")
    .refine((value) => !/^\s*$/.test(value), "Duration is required")
    .refine((value) => {
      const num = Number(value);
      return num >= 0 && num <= 100;
    }, "Duration should be between 0 and 100"),
});

export type ISubscriptionFreeTrailForm = z.infer<
  typeof subscriptionFreeTrailFormSchema
>;
