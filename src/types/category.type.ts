import { z } from "zod";

export const categorySchema = z.object({
  id: z.number(),
  title: z.string(),
  available_for_course: z.boolean(),
  available_for_insight: z.boolean(),
  available_for_stock: z.boolean(),
  is_deleted: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type ICategory = z.infer<typeof categorySchema>;

export const categoryFormSchema = z.object({
  title: z.string().min(1, "Category name can't be empty"),
  available_for_course: z.string(),
  available_for_insight: z.string(),
  available_for_stock: z.string(),
});

export type ICategoryForm = z.infer<typeof categoryFormSchema>;
