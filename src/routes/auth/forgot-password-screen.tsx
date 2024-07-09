import { AuthSideBanner } from "./components/auth-banner";
import { ForgotPasswordForm } from "./components/forgot-password-form";

export default function ForgotPasswordScreen() {
  return (
    <div className="grid h-full w-full grid-cols-1 gap-5 lg:grid-cols-2">
      <AuthSideBanner />
      <ForgotPasswordForm />
    </div>
  );
}
