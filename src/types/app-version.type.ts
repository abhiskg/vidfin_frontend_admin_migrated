import type { appVersionFormSchema } from "@/schemas/app-version-schema";
import type { z } from "zod";

export interface IAppVersion {
  id: number;
  min_version: string;
  upgrade_version: string;
  min_ios_version: string;
  upgrade_ios_version: string;
  admin_id: number;
  created_at: string;
  updated_at: string;
}

export type IAppVersionForm = z.infer<typeof appVersionFormSchema>;
