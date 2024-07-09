import { z } from "zod";

export const adminUserSchema = z.object({
  admin_id: z.number(),
  admin_type: z.string(),
  email: z.string(),
  name: z.string(),
  mobile_number: z.string(),
  password: z.string(),
  image: z.string(),
  admin_status: z.string().or(z.number()),
  role_id: z.number(),
  is_deleted: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  permission: z
    .object({
      role_name: z.string(),
    })
    .nullable(),
});

export type IAdminUser = z.infer<typeof adminUserSchema>;

export const adminUserFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Name can't be empty"),
  email: z
    .string()
    .min(1, "Email can't be empty")
    .email("Enter a valid email")
    .refine((value) => !/^\s*$/.test(value), "Email can't be empty"),
  password: z
    .string()
    .min(1, "Password can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Password can't be empty"),
  role_id: z.string().min(1, "Role can't be empty"),
});

export type IAdminUserForm = z.infer<typeof adminUserFormSchema>;

export const adminUserEditFormSchema = z.object({
  name: z
    .string()
    .min(1, "Name can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Name can't be empty"),
  email: z
    .string()
    .min(1, "Email can't be empty")
    .email("Enter a valid email")
    .refine((value) => !/^\s*$/.test(value), "Email can't be empty"),
  password: z.string().optional(),
  role_id: z.string().min(1, "Role can't be empty"),
});

export type IAdminUserEditForm = z.infer<typeof adminUserEditFormSchema>;
