import { z } from "zod";

export const faqSchema = z.object({
  id: z.number(),
  admin_id: z.number(),
  question: z.string(),
  answer: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type IFaq = z.infer<typeof faqSchema>;

export const faqFormSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  answer: z.string().nonempty("Answer is required"),
});

export type IFaqForm = z.infer<typeof faqFormSchema>;
