import type { Icons } from "@/components/icon";

export interface ISidebar {
  id: string;
  title: string;
  icon: keyof typeof Icons;
  link: string;
}
