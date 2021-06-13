import {User} from '../../utils/common/login/user';

export class Message {

    id : number;
    contenu : string;
    dateEnvoie: string;
    sender: User;
    receiver: User;

}
