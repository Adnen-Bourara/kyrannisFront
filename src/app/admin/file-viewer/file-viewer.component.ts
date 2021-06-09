import { Component, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { CoreConfigService } from "@core/services/config.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Breadcrumb } from "app/layout/components/content-header/breadcrumb/breadcrumb.component";
import { adminMenu } from "app/menu/adminMenu";
import { assistantMenu } from "app/menu/assistantMenu";
import { menu } from "app/menu/menu";
import {Fichier} from './fichier';
import {FichierService} from './fichier.service';
import {User} from '../../utils/common/login/user';
import {UserServiceService} from '../../utils/common/login/user-service.service';

@Component({
  selector: "app-file-viewer",
  templateUrl: "./file-viewer.component.html",
  styleUrls: ["./file-viewer.component.scss"],
})
export class FileViewerComponent implements OnInit {
  public breadcrumbDefault: Breadcrumb;
  public pageBasicText = 1;
  coreConfig: any;
  menu: any;
  files : Fichier[] =[];
  showedName = "Choisissez votre fichier";
  idClient :any;
  client = new User();
  fileToAdd = new Fichier();
  file: File;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreMenuService: CoreMenuService,
    private _coreConfigService: CoreConfigService,
    private router: Router,
    private modalService: NgbModal,
    private fichierService: FichierService,
    private userService: UserServiceService,
    private _router: Router,
  )
  {
    let queryString = this.router.url;
    console.log(queryString);

    switch (queryString) {
      case "/admin/viewfiles":
        this.menu = adminMenu;
        this._coreConfigService.setConfig({
          layout: { menu: { collapsed: false } },
        });
        this._coreMenuService.register("adminMenu", this.menu);
        this._coreMenuService.setCurrentMenu("adminMenu");
        break;
      case "/assistants/viewfiles":
        this.menu = assistantMenu;
        this._coreConfigService.setConfig({
          layout: { menu: { collapsed: false } },
        });
        this._coreMenuService.register("assistantMenu", this.menu);
        this._coreMenuService.setCurrentMenu("assistantMenu");
        break;
      case "/clients/viewfiles":
        this.menu = menu;
        this._coreConfigService.setConfig({
          layout: { menu: { collapsed: false } },
        });
        this._coreMenuService.register("menu", this.menu);
        this._coreMenuService.setCurrentMenu("menu");
        break;
      default:
      // code block
    }

    this.breadcrumbDefault = {
      links: [
        {
          name: "Home",
          isLink: true,
          link: "/",
        },
        {
          name: "Admin",
          isLink: true,
          link: "/admin",
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

async  ngOnInit(){
    this.idClient = localStorage.getItem('idClient');
    this.client = await this.userService.getUser(this.idClient);
    this.files = await this.fichierService.getFichiersByClientId(this.idClient);
  }


  /**
   * Toggle the sidebar
   *
   * @param key
   */
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.showedName =  event.target.files[0].name;
      const size = event.target.files[0].size;
      this.fileToAdd.taille = `${Math.round(size / 1024)} KB`;
      this.file = event.target.files[0];
      this.fileToAdd.extension = event.target.files[0].name.split('.')[1];
      this.fileToAdd.dateCreation = new Date().toDateString();
    }
  }

  async addFichier(){
    this.fileToAdd = await this.fichierService.addFichier(this.fileToAdd,this.client.id);
    await this.fichierService.uploadFile(this.file, this.fileToAdd);
    this.ngOnInit();
  }

  async deleteFile(f:any) {
    await this.fichierService.deleteFichier(f.id);
    this.ngOnInit();
  }

  seeMore(f:any)
  {
    localStorage.setItem('idFichier',f.id);
    this._router.navigateByUrl('admin/Fichier/more');
  }

  GetInitials(name: string) {
    const thefullname = name.split(" ");
    const initials =
      thefullname.shift().charAt(0) + thefullname.pop().charAt(0);
    return initials.toUpperCase();
  }

  modalOpen(modalForm) {
    console.log(modalForm);
    this.modalService.open(modalForm);
  }
  modalClose(modalForm) {
    console.log(modalForm);
    this.modalService.dismissAll(modalForm);
  }
  modalOpenLG(modalLG) {
    this.fileToAdd.categorie = 'Autres';
    this.modalService.open(modalLG, {
      centered: true,
      size: "lg", // size: 'xs' | 'sm' | 'lg' | 'xl'
      windowClass: "modal modal-info",
    });
  }
}
