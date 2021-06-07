import { User } from "app/utils/common/login/user";

export class Company {
  id: number;
  name: String;
  email: String;
  address: String;
  taxRegistrationNumber: String;
  listClient: User[];
}
