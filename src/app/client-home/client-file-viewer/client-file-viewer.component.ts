import { Component, OnInit } from '@angular/core';
import {User} from '../../utils/common/login/user';
import {UserServiceService} from '../../utils/common/login/user-service.service';
import {Router} from '@angular/router';
import {Breadcrumb} from '../../layout/components/content-header/breadcrumb/breadcrumb.component';
import {Fichier} from '../../admin/file-viewer/fichier';
import {CoreSidebarService} from '../../../@core/components/core-sidebar/core-sidebar.service';
import {CoreMenuService} from '../../../@core/components/core-menu/core-menu.service';
import {CoreConfigService} from '../../../@core/services/config.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FichierService} from '../../admin/file-viewer/fichier.service';
import {assistantMenu} from '../../menu/assistantMenu';
import {menu} from '../../menu/menu';

@Component({
  selector: 'app-client-file-viewer',
  templateUrl: './client-file-viewer.component.html',
  styleUrls: ['./client-file-viewer.component.scss']
})
export class ClientFileViewerComponent implements OnInit {
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
  public connectedUser = new User();
  constructor(private _coreSidebarService: CoreSidebarService,
              private _coreMenuService: CoreMenuService,
              private _coreConfigService: CoreConfigService,
              private router: Router,
              private modalService: NgbModal,
              private fichierService: FichierService,
              private userService: UserServiceService,
              private _router: Router,)
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
    this.connectedUser = await  this.userService.getUser( + localStorage.getItem('connected')) ;
    if(this.connectedUser.role != 'Client' )
      this._router.navigate(["/login"]);
    this.client = await this.userService.getUser(this.connectedUser.id);
    this.files = await this.fichierService.getFichiersByClientId(this.connectedUser.id);
  }

  async filterListFile(categorie: string)
  {   this.files = await this.fichierService.getFichiersByClientId(this.idClient);
    if (categorie != 'ALL')
      this.files = this.files.filter(value => value.categorie == categorie);

  }

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
    this._router.navigateByUrl('clients/Fichier/More');
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
