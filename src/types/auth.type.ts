import type { IUserRole } from "./role.type";
export interface IUser {
  admin_id: number;
  name: string;
  email: string;
  mobile_number: string;
  access_token: string;
  admin_status: string | number;
  roleDetails: IUserRole;
}
