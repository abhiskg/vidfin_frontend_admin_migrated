import { useAppStore } from "@/app/store";
import type { IUserPermissions } from "@/types/role.type";
import { Navigate } from "react-router-dom";

interface AccessLayoutProps {
  children: React.ReactNode;
  access: keyof IUserPermissions;
  type: string;
}
export default function AccessLayout({
  children,
  access,
  type,
}: AccessLayoutProps) {
  const user = useAppStore((state) => state.user);

  if (
    user &&
    user.roleDetails?.permissions[access]?.[
      type as keyof IUserPermissions[typeof access]
    ] === 1
  ) {
    return <>{children}</>;
  }

  return <Navigate to="/" replace />;
}
