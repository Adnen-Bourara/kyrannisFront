import { Role } from './role';

export class UserOld {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: Role;
  token?: string;
}
