import { useQuerySingleRole, useUpdateRoleMutation } from "@/api/use-role-api";
import { FormInput } from "@/components/form/form-input";
import { FormMultipleSelect } from "@/components/form/form-multiple-select";
import { Icons } from "@/components/icon";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { permissionOptions } from "@/constants/role-constant";
import { convertPermissionIntoObject, filterPermission } from "@/lib/utils";
import {
  rolePermissionFormSchema,
  type IRolePermissionForm,
  type IUserRole,
} from "@/types/role.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

export default function RoleManagementEditScreen() {
  const { id } = useParams();
  const { data: role, isPending } = useQuerySingleRole(id || "");

  if (isPending) {
    return <PageLoader />;
  }

  return <>{role && <RoleManagementEditForm role={role} />}</>;
}

interface RoleManagementEditFormProps {
  role: IUserRole;
}

function RoleManagementEditForm({ role }: RoleManagementEditFormProps) {
  const form = useForm<IRolePermissionForm>({
    resolver: zodResolver(rolePermissionFormSchema),
    defaultValues: {
      role_name: role.role_name,
      Dashboard: filterPermission(role.permissions.Dashboard || {}),
      featured_category_management: filterPermission(
        role.permissions.featured_category_management || {},
      ),
      domain_management: filterPermission(
        role.permissions.domain_management || {},
      ),
      referral_and_gifts: filterPermission(
        role.permissions.referral_and_gifts || {},
      ),
      admin_user_management: filterPermission(
        role.permissions.admin_user_management || {},
      ),
      roles_management: filterPermission(
        role.permissions.roles_management || {},
      ),
      course_management: filterPermission(
        role.permissions.course_management || {},
      ),
      application_user_management: filterPermission(
        role.permissions.application_user_management || {},
      ),
      insight_management: filterPermission(
        role.permissions.insight_management || {},
      ),
      banners_management: filterPermission(
        role.permissions.banners_management || {},
      ),
      subscription_management: filterPermission(
        role.permissions.subscription_management || {},
      ),
      payment_management: filterPermission(
        role.permissions.payment_management || {},
      ),
      static_content_management: filterPermission(
        role.permissions.static_content_management || {},
      ),
    },
  });
  const { isPending, mutate } = useUpdateRoleMutation();

  const navigate = useNavigate();

  const onSubmit = (data: IRolePermissionForm) => {
    const permissions = {
      Dashboard: convertPermissionIntoObject(data.Dashboard),
      featured_category_management: convertPermissionIntoObject(
        data.featured_category_management,
      ),
      domain_management: convertPermissionIntoObject(data.domain_management),
      referral_and_gifts: convertPermissionIntoObject(data.referral_and_gifts),
      admin_user_management: convertPermissionIntoObject(
        data.admin_user_management,
      ),
      roles_management: convertPermissionIntoObject(data.roles_management),
      course_management: convertPermissionIntoObject(data.course_management),
      application_user_management: convertPermissionIntoObject(
        data.application_user_management,
      ),
      insight_management: convertPermissionIntoObject(data.insight_management),
      banners_management: convertPermissionIntoObject(data.banners_management),
      subscription_management: convertPermissionIntoObject(
        data.subscription_management,
      ),
      payment_management: convertPermissionIntoObject(data.payment_management),
      static_content_management: convertPermissionIntoObject(
        data.static_content_management,
      ),
    };

    mutate(
      {
        role_name: data.role_name,
        permissions,
        role_id: role.role_id.toString(),
      },
      {
        onSuccess: () => {
          navigate("/role-management");
        },
      },
    );
  };

  return (
    <div className="mt-2">
      <Breadcrumbs
        segments={[
          {
            title: "Dashboard",
            href: "/",
          },
          {
            title: "Role Management",
            href: `/role-management`,
          },
          {
            title: "Edit Role",
            href: `/role-management/${role.role_id}/edit`,
          },
        ]}
      />
      {role && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="mt-3"
          >
            <FormInput
              form={form}
              name="role_name"
              label="Role Name"
              placeholder="Enter role name"
              className="max-w-[50%]"
            />
            <div className="text-lg font-medium">Permissions:</div>
            <div className="grid grid-cols-2 gap-4 py-3">
              <div>
                <FormMultipleSelect
                  form={form}
                  name="Dashboard"
                  label="Dashboard"
                  placeholder="Select Permissions"
                  options={permissionOptions.Dashboard}
                />
                <FormMultipleSelect
                  form={form}
                  name="featured_category_management"
                  label="Featured Category Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.featured_category_management}
                />
                <FormMultipleSelect
                  form={form}
                  name="domain_management"
                  label="Domain Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.domain_management}
                />
                <FormMultipleSelect
                  form={form}
                  name="referral_and_gifts"
                  label="Referral and Gifts"
                  placeholder="Select Permissions"
                  options={permissionOptions.referral_and_gifts}
                />
                <FormMultipleSelect
                  form={form}
                  name="admin_user_management"
                  label="Admin User Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.admin_user_management}
                />
                <FormMultipleSelect
                  form={form}
                  name="roles_management"
                  label="Roles Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.roles_management}
                />
              </div>

              <div>
                <FormMultipleSelect
                  form={form}
                  name="application_user_management"
                  label="Application User Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.application_user_management}
                />
                <FormMultipleSelect
                  form={form}
                  name="insight_management"
                  label="Insight Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.insight_management}
                />
                <FormMultipleSelect
                  form={form}
                  name="banners_management"
                  label="Banners Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.banners_management}
                />
                <FormMultipleSelect
                  form={form}
                  name="subscription_management"
                  label="Subscription Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.subscription_management}
                />
                <FormMultipleSelect
                  form={form}
                  name="payment_management"
                  label="Payment Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.payment_management}
                />
                <FormMultipleSelect
                  form={form}
                  name="static_content_management"
                  label="Static Content Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.static_content_management}
                />
              </div>
            </div>
            <FormMultipleSelect
              form={form}
              name="course_management"
              label="Course Management"
              placeholder="Select Permissions"
              options={permissionOptions.course_management}
            />

            {!isPending ? (
              <Button
                type="submit"
                className="px-[22px]"
                // disabled={!form.formState.isDirty}
              >
                Update Role
              </Button>
            ) : (
              <Button disabled>
                <Icons.buttonLoader className="mr-1 h-5 w-5 animate-spin stroke-card" />
                Loading...
              </Button>
            )}
          </form>
        </Form>
      )}
    </div>
  );
}
