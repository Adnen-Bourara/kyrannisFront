import { Component, OnInit } from '@angular/core';
import {User} from '../../../utils/common/login/user';
import {UserServiceService} from '../../../utils/common/login/user-service.service';
import {Router} from '@angular/router';
import {Fichier} from '../../../admin/file-viewer/fichier';
import {Commentaire} from '../../../admin/file-viewer/fichier-details/commentaire';
import {CoreMenuService} from '../../../../@core/components/core-menu/core-menu.service';
import {CoreConfigService} from '../../../../@core/services/config.service';
import {FichierService} from '../../../admin/file-viewer/fichier.service';
import {CommentaireService} from '../../../admin/file-viewer/fichier-details/commentaire.service';
import {menu} from '../../../menu/menu';

@Component({
  selector: 'app-client-file-details',
  templateUrl: './client-file-details.component.html',
  styleUrls: ['./client-file-details.component.scss']
})
export class ClientFileDetailsComponent implements OnInit {
  menu: any;
  breadcrumbDefault: { links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; };
  fichier = new Fichier();
  client = new User()
  userConnected = new User();
  listComment : Commentaire[] = [];

  newComment = new Commentaire();
  editMode = false;
  editedComment : any;

  constructor(     private _coreMenuService: CoreMenuService,
                   private _coreConfigService: CoreConfigService,
                   private router: Router,
                   private fichierService: FichierService,
                   private userService: UserServiceService,
                   private commentaireService : CommentaireService,)
  { this.menu = menu;
    this._coreConfigService.setConfig({
      layout: { menu: { collapsed: false } },
    });
    this._coreMenuService.register("clientMenu", this.menu);
    this._coreMenuService.setCurrentMenu("clientMenu");

    this.breadcrumbDefault = {
      links: [
        {
          name: "Home",
          isLink: true,
          link: "/",
        },
        {
          name: "Clients",
          isLink: true,
          link: "/Client",
        },
        {
          name: "Fichiers",
          isLink: false,
        },
        {
          name: "Consulter Fichiers",
          isLink: false,
        },
      ],
    };
    this._coreConfigService.config = {
      layout: {
        navbar: {
          hidden: false,
          type: "floating-nav",
          backgroundColor: "",
        },
        menu: {
          hidden: false,
        },
        footer: {
          hidden: true,
        },
        customizer: false,
        enableLocalStorage: false,
      },
    };
  }

  async ngOnInit() {
    this.userConnected = await  this.userService.getUser( + localStorage.getItem('connected')) ;
    if(this.userConnected.role != 'Client' )
      this.router.navigate(["/login"]);
    this.onGetFile();

    this.newComment = new Commentaire();
  }

  async onGetFile(){
    this.fichier = await this.fichierService.getById( + localStorage.getItem("idFichier"));
    console.log(this.fichier);

    this.listComment = await this.commentaireService.getCommentsByFileId( + localStorage.getItem("idFichier"));

    this.listComment.forEach( a => a.editMode = false );

    console.log(this.listComment);
  }


  async validComment() {
    this.newComment.dateEnvoie = new Date().toDateString();
    this.commentaireService.addComment(this.userConnected.id, this.fichier.id, this.newComment);
    this.ngOnInit();
  }

  async onDeleteComment(c : any) {
    await this.commentaireService.deleteComment(c.id);
    this.ngOnInit();
  }

  editModeSwitch(c: any) {
    c.editMode = ! c.editMode;
    this.editedComment = c.contenu;
  }

  validEditComment(c: any)
  {
    this.newComment = c;
    this.newComment.contenu = this.editedComment;
    this.newComment.dateEnvoie = new Date().toDateString();
    this.commentaireService.editComment(this.newComment);
    this.editModeSwitch(c);
    this.ngOnInit();
  }

}
