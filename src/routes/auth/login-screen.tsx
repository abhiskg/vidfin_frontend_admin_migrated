import { AuthSideBanner } from "./components/auth-banner";
import { LoginForm } from "./components/login-form";

export default function LoginScreen() {
  return (
    <div className=" grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-2">
      <AuthSideBanner />
      <LoginForm />
    </div>
  );
}
