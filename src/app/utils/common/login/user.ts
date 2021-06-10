import {Company} from '../../../admin/companies/company';

export class User {
  id: number;
  username: String;
  password: String;
  firstName: String;
  lastName: String;
  tel: String;
  email: String;
  role: String;
  poste: String;
  assistant: User;
  company : Company;
  listClients : User[];
}
