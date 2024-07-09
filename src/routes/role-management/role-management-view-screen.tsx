import { useQuerySingleRole } from "@/api/use-role-api";
import { FormInput } from "@/components/form/form-input";
import { FormMultipleSelect } from "@/components/form/form-multiple-select";
import { PageLoader } from "@/components/loader/page-loader";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Form } from "@/components/ui/form";
import { permissionOptions } from "@/constants/role-constant";
import { filterPermission } from "@/lib/utils";
import {
  rolePermissionFormSchema,
  type IRolePermissionForm,
  type IUserRole,
} from "@/types/role.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export default function RoleManagementViewScreen() {
  const { id } = useParams();
  const { data: role, isPending } = useQuerySingleRole(id || "");

  if (isPending) {
    return <PageLoader />;
  }

  return <>{role && <RoleManagementViewForm role={role} />}</>;
}

interface RoleManagementViewFormProps {
  role: IUserRole;
}

function RoleManagementViewForm({ role }: RoleManagementViewFormProps) {
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
            title: "View Role",
            href: `/role-management/${role.role_id}/view`,
          },
        ]}
      />
      {role && (
        <Form {...form}>
          <form noValidate className="mt-3">
            <FormInput
              form={form}
              name="role_name"
              label="Role Name"
              placeholder="Enter role name"
              className="max-w-[50%]"
              disabled
            />
            <div className="text-lg font-medium">Permissions:</div>
            <div className="grid grid-cols-2 gap-4 pt-3">
              <div>
                <FormMultipleSelect
                  form={form}
                  disabled
                  name="Dashboard"
                  label="Dashboard"
                  placeholder="Select Permissions"
                  options={permissionOptions.Dashboard}
                />
                <FormMultipleSelect
                  form={form}
                  disabled
                  name="featured_category_management"
                  label="Featured Category Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.featured_category_management}
                />
                <FormMultipleSelect
                  form={form}
                  disabled
                  name="domain_management"
                  label="Domain Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.domain_management}
                />
                <FormMultipleSelect
                  form={form}
                  disabled
                  name="referral_and_gifts"
                  label="Referral and Gifts"
                  placeholder="Select Permissions"
                  options={permissionOptions.referral_and_gifts}
                />
                <FormMultipleSelect
                  form={form}
                  disabled
                  name="admin_user_management"
                  label="Admin User Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.admin_user_management}
                />
                <FormMultipleSelect
                  form={form}
                  disabled
                  name="roles_management"
                  label="Roles Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.roles_management}
                />
              </div>

              <div>
                <FormMultipleSelect
                  form={form}
                  disabled
                  name="application_user_management"
                  label="Application User Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.application_user_management}
                />
                <FormMultipleSelect
                  form={form}
                  disabled
                  name="insight_management"
                  label="Insight Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.insight_management}
                />
                <FormMultipleSelect
                  form={form}
                  disabled
                  name="banners_management"
                  label="Banners Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.banners_management}
                />
                <FormMultipleSelect
                  form={form}
                  disabled
                  name="subscription_management"
                  label="Subscription Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.subscription_management}
                />
                <FormMultipleSelect
                  form={form}
                  disabled
                  name="payment_management"
                  label="Payment Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.payment_management}
                />
                <FormMultipleSelect
                  form={form}
                  disabled
                  name="static_content_management"
                  label="Static Content Management"
                  placeholder="Select Permissions"
                  options={permissionOptions.static_content_management}
                />
              </div>
            </div>
            <FormMultipleSelect
              form={form}
              disabled
              name="course_management"
              label="Course Management"
              placeholder="Select Permissions"
              options={permissionOptions.course_management}
            />
          </form>
        </Form>
      )}
    </div>
  );
}
