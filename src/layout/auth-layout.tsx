import { useAppStore } from "@/app/store";
import { Navigate, Outlet } from "react-router-dom";
import { AuthHeader } from "./auth-header";

export default function AuthLayout() {
  const user = useAppStore((state) => state.user);

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <AuthHeader />
        <main className="container-1350 mx-auto flex flex-1 items-center justify-center px-px">
          <Outlet />
        </main>
      </div>
    );
  }
  return <Navigate to="/" />;
}
