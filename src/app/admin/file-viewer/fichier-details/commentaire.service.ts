import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Commentaire} from './commentaire';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  url = 'http://localhost:8081/Comment/';
  constructor(private httpClient: HttpClient) { }

  async addComment(idCommentor: number , idFichier: number , comment : Commentaire) {
    return this.httpClient.post(this.url + 'create/User/' + idCommentor +'/Fichier/' + idFichier , comment).toPromise();
  }

  async getCommentsByFileId(id: number) {
    return this.httpClient.get<Commentaire[]>(this.url + 'getByFichier/' + id).toPromise();
  }

  async deleteComment(id: number) {
    return this.httpClient.delete(this.url + 'delete/' + id ).toPromise();
  }

  async editComment(comment : Commentaire) {
    return this.httpClient.put(this.url + 'edit' , comment).toPromise();
  }



}
