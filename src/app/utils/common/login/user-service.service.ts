import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  url = 'http://localhost:8081/';

  constructor(private httpClient: HttpClient) {}

  async postLogin(params: any) {
    return this.httpClient.post<User>(this.url + 'login', params).toPromise();
  }

  async getAssistants() {
    return this.httpClient
      .get<User[]>(this.url + 'User/GetAllAssistants')
      .toPromise();
  }
  async saveAssistant(user: User) {
    return this.httpClient
      .post<any>(this.url + 'User/createAssistant', user)
      .toPromise();
  }

  async saveClient(user: User, idCompany: number , idAssistant: number) {
    return this.httpClient
      .post<User>(this.url + '/User/createClient/Company/' + idCompany + '/Assistant/' + idAssistant, user)
      .toPromise();
  }

  async getAllUsers() {
    return this.httpClient
        .get<User[]>(this.url + 'User/getAll')
        .toPromise();
  }

  async getClients() {
    return this.httpClient
      .get<User[]>(this.url + 'User/GetAllClients')
      .toPromise();
  }

  async editUser(user: User) {
    return this.httpClient.put<User>(this.url + 'User/Edit', user).toPromise();
  }

  async editClient(user: User, idCompany: number , idAssistant: number) {
    return this.httpClient
        .put<User>(this.url + '/User/Edit/Company/' + idCompany + '/Assistant/' + idAssistant, user)
        .toPromise();
  }
  async getUser(id: number) {
    return this.httpClient
      .get<User>(this.url + 'User/GetById/' + id)
      .toPromise();
  }

  async deleteUser(id: number) {
    return this.httpClient.delete<User>(this.url + 'User/delete/' + id).toPromise();
  }

  async getClientsByCompany(id: number) {
    return this.httpClient.get<User[]>(this.url + '/User/getClients/Company/' + id).toPromise();
  }

  async getClientsByAssistant(id : number) {
    return  this.httpClient.get<User[]>(this.url + '/User/getClients/Assistant/' + id).toPromise();
  }

checkUserName(user: User) {
   return  this.httpClient.post(this.url + '/User/checkUsername', user, {responseType: 'text'}).toPromise();
  }

  changePassword(id: number , newPassword : String ) {
    return this.httpClient.put(this.url + '/User/ChangePassword/' + id, newPassword).toPromise();
  }
}
