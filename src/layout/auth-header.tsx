import { Icons } from "../components/icon";
import { ThemeToggle } from "../components/ui/theme-toggle";

export function AuthHeader() {
  return (
    <div className="h-14 w-full border-b">
      <div className="container-1350 mx-auto flex h-full items-center justify-between">
        <Icons.logo className="h-8 w-24 lg:mr-8 lg:h-14 lg:w-32" />
        <ThemeToggle />
      </div>
    </div>
  );
}
