import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Fichier} from './fichier';

@Injectable({
  providedIn: 'root'
})
export class FichierService {
  url = 'http://localhost:8081/Fichier/';
  constructor(private httpClient: HttpClient) { }

  async addFichier(fichier: Fichier, id: number) {
    return this.httpClient.post<Fichier>(this.url + 'create/Client/' + id , fichier).toPromise();
  }

  async editFichier(fichier: Fichier) {
    return this.httpClient.put<Fichier>(this.url + 'edit' , fichier).toPromise();
  }

  async getById(id: number) {
    return this.httpClient.get<Fichier>(this.url + 'getById/' + id).toPromise();
  }

  async getAll() {
    return this.httpClient.get<Fichier[]>(this.url + 'GetAll').toPromise();
  }

  async getFichiersByClientId(id : number) {
    return this.httpClient.get<Fichier[]>(this.url + 'getByClient/' + id).toPromise();
  }

  async  deleteFichier(id : number) {
    return this.httpClient.delete(this.url + 'delete/' + id).toPromise();
  }

 async uploadFile(file: File , fichier: Fichier)
  {
    const formData = new FormData();
    formData.append('file', file, fichier.nom + '.' + fichier.extension);
    return this.httpClient.post(this.url + fichier.id +'/uploadFile' , formData).toPromise();
  }
}
