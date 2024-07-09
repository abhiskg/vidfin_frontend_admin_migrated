import { z } from "zod";

export const userPermissionsSchema = z.object({
  Dashboard: z
    .object({
      view: z.number().optional(),
    })
    .optional(),
  featured_category_management: z
    .object({
      add: z.number().optional(),
      update: z.number().optional(),
      delete: z.number().optional(),
      view: z.number().optional(),
      enable: z.number().optional(),
    })
    .optional(),
  domain_management: z
    .object({
      add: z.number().optional(),
      update: z.number().optional(),
      delete: z.number().optional(),
      view: z.number().optional(),
      enable: z.number().optional(),
    })
    .optional(),
  referral_and_gifts: z
    .object({
      update: z.number().optional(),
      enable: z.number().optional(),
      view: z.number().optional(),
    })
    .optional(),
  admin_user_management: z
    .object({
      add: z.number().optional(),
      update: z.number().optional(),
      delete: z.number().optional(),
      view: z.number().optional(),
      enable: z.number().optional(),
    })
    .optional(),
  roles_management: z
    .object({
      add: z.number().optional(),
      update: z.number().optional(),
      delete: z.number().optional(),
      view: z.number().optional(),
      enable: z.number().optional(),
    })
    .optional(),
  course_management: z
    .object({
      add: z.number().optional(),
      update: z.number().optional(),
      delete: z.number().optional(),
      view: z.number().optional(),
      publish_course: z.number().optional(),
      curriculum: z.number().optional(),
      rating: z.number().optional(),
      annoucements: z.number().optional(),
      resources: z.number().optional(),
      course_assessment: z.number().optional(),
    })
    .optional(),
  application_user_management: z
    .object({
      add: z.number().optional(),
      update: z.number().optional(),
      delete: z.number().optional(),
      view: z.number().optional(),
      enable: z.number().optional(),
    })
    .optional(),
  insight_management: z
    .object({
      add: z.number().optional(),
      update: z.number().optional(),
      delete: z.number().optional(),
      view: z.number().optional(),
    })
    .optional(),
  banners_management: z
    .object({
      add: z.number().optional(),
      update: z.number().optional(),
      delete: z.number().optional(),
      view: z.number().optional(),
    })
    .optional(),
  subscription_management: z
    .object({
      add: z.number().optional(),
      update: z.number().optional(),
      delete: z.number().optional(),
      view: z.number().optional(),
      punlish: z.number().optional(),
    })
    .optional(),
  payment_management: z
    .object({
      view: z.number().optional(),
      view_refund: z.number().optional(),
      initiate_refund: z.number().optional(),
    })
    .optional(),
  static_content_management: z
    .object({
      view: z.number().optional(),
      privacy_policy: z.number().optional(),
      terms_and_condition: z.number().optional(),
      faq: z.number().optional(),
      punlish: z.number().optional(),
      unpublish: z.number().optional(),
    })
    .optional(),
});

export type IUserPermissions = z.infer<typeof userPermissionsSchema>;

export const userRoleSchema = z.object({
  role_id: z.number(),
  admin_id: z.number(),
  role_name: z.string(),
  is_deleted: z.string(),
  status: z.string(),
  permissions: userPermissionsSchema,
});

export type IUserRole = z.infer<typeof userRoleSchema>;

export const rolePermissionFormSchema = z.object({
  role_name: z
    .string()
    .min(1, "Role name can't be empty")
    .refine((value) => !/^\s*$/.test(value), "Role name can't be empty"),
  Dashboard: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  featured_category_management: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  domain_management: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  referral_and_gifts: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  admin_user_management: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  roles_management: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  course_management: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  application_user_management: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  insight_management: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  banners_management: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  subscription_management: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  payment_management: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
  static_content_management: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
    }),
  ),
});

export type IRolePermissionForm = z.infer<typeof rolePermissionFormSchema>;
