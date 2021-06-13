import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from './message';
import {User} from '../../utils/common/login/user';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  url = 'http://localhost:8081/Message/';
  constructor(private httpClient: HttpClient) { }

  async sendMessage(message: Message, idSender: number, idReceiver: number) {
  return this.httpClient.post<Message>(this.url + 'Sender/' + idSender + '/Receiver/' + idReceiver, message).toPromise();
  }

  async getConversation(idUser1 : number , idUser2: number) {
    return this.httpClient.get<Message[]>(this.url + 'getConversation/user1/' + idUser1 + '/user2/' + idUser2  ).toPromise();
  }

  async  getConversations(idUser : number) {
    return this.httpClient.get<User[]>(this.url + 'getListConversation/' + idUser).toPromise();
  }



}
