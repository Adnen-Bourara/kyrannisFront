import {User} from '../../../utils/common/login/user';

export class Commentaire {
      id: number;
      contenu : String;
      dateEnvoie : String;
      commentor : User;
      editMode : Boolean ;
}
