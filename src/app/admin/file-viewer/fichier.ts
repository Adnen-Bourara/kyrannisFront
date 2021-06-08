import { User } from "app/utils/common/login/user";

export class Fichier {
  id: number;
  nom: String;
  taille: String;
  filePath: String;
  nomCreateur: String;
  dateCreation: String;
  dateModif : String ;
  extension : String ;
  categorie : String ;
  client : User ;
 // commentaire : Commentaires[] 
}
