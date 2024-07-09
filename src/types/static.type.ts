import { z } from "zod";

export type IStaticContent = {
  id: number;
  admin_id: number;
  title: string;
  type: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export const staticContentFormSchema = z.object({
  type: z.string().min(1, "Type can't be empty"),
  content: z.string().min(1, "Content can't be empty"),
});

export type IStaticContentForm = z.infer<typeof staticContentFormSchema>;

export const investorFormSchema = z.object({
  pdf: z
    .instanceof(FileList, { message: "Pdf is required" })
    .refine((value) => value.length > 0, { message: "Pdf is required" }),
});

export type IInvestorForm = z.infer<typeof investorFormSchema>;
