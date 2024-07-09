import { z } from "zod";

export const appUserSchema = z.object({
  user_id: z.number(),
  user_name: z.string().nullable(),
  device_type: z.string(),
  device_id: z.string().nullable(),
  phone: z.string().nullable(),
  email: z.string().nullable(),
  country_code: z.string().nullable(),
  gender: z.string().nullable(),
  user_image: z.string().nullable(),
  language: z.string().nullable(),
  latitude: z.string().nullable(),
  longitude: z.string().nullable(),
  location: z.string().nullable(),
  email_verify: z.number(),
  phone_verify: z.string(),
  status: z.number(),
  is_master: z.number(),
  full_access: z.number(),
  last_login: z.string().nullable(),
  created_at: z.string(),
  subscription: z
    .object({
      subscription_id: z.number(),
      subscription: z
        .object({
          title: z.string().optional(),
        })
        .nullable(),
    })
    .nullable(),
});

export type IAppUser = z.infer<typeof appUserSchema>;
