import { z } from "zod";

export const notificationFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
});

export type INotificationForm = z.infer<typeof notificationFormSchema>;
