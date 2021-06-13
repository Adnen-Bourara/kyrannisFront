import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { CoreConfigService } from '@core/services/config.service';
import { adminMenu } from 'app/menu/adminMenu';
import { UserServiceService } from 'app/utils/common/login/user-service.service';
import { FichierService } from '../fichier.service';
import {Fichier} from '../fichier';
import {User} from '../../../utils/common/login/user';
import {CommentaireService} from './commentaire.service';
import {Commentaire} from './commentaire';

@Component({
  selector: 'app-fichier-details',
  templateUrl: './fichier-details.component.html',
  styleUrls: ['./fichier-details.component.scss']
})
export class FichierDetailsComponent implements OnInit {
  menu: any;
  breadcrumbDefault: { links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; };
  fichier = new Fichier();
  client = new User()
  userConnected = new User();
  listComment : Commentaire[] = [];

  newComment = new Commentaire();
  editMode = false;
  editedComment : any;

  constructor(
    private _coreMenuService: CoreMenuService,
    private _coreConfigService: CoreConfigService,
    private router: Router,
    private fichierService: FichierService,
    private userService: UserServiceService,
    private commentaireService : CommentaireService,

  )
  {
    let queryString = this.router.url;
    console.log(queryString);

    this.menu = adminMenu;
    this._coreConfigService.setConfig({
      layout: { menu: { collapsed: false } },
    });
    this._coreMenuService.register("adminMenu", this.menu);
    this._coreMenuService.setCurrentMenu("adminMenu");

    this.breadcrumbDefault = {
      links: [
        {
          name: "Admin",
          isLink: true,
          link: "/admin/home",
        },
        {
          name: "Fichiers",
          isLink: true,
          link: "/admin/Fichier",

        },
        {
          name: "Détail du Fichier",
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
    if(this.userConnected.role != 'SuperAdmin' )
      this.router.navigate(["/login"]);
    this.onGetFile();

    this.newComment = new Commentaire();
  }

  async onGetFile(){
    this.fichier = await this.fichierService.getById( + localStorage.getItem("idFichier"));
    console.log(this.fichier);
    this.client = await this.userService.getUser( + localStorage.getItem('idClient') );

    this.userConnected = await this.userService.getUser(+ localStorage.getItem('connected') );

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
