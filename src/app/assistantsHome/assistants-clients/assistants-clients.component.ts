import { Component, OnInit } from "@angular/core";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { CoreConfigService } from "@core/services/config.service";
import { Breadcrumb } from "app/layout/components/content-header/breadcrumb/breadcrumb.component";
import { assistantMenu } from "app/menu/assistantMenu";
import {Router} from '@angular/router';
import {UserServiceService} from '../../utils/common/login/user-service.service';
import {User} from '../../utils/common/login/user';
import {Company} from '../../admin/companies/company';
import {CompanyService} from '../../admin/companies/company.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: "app-assistants-clients",
  templateUrl: "./assistants-clients.component.html",
  styleUrls: ["./assistants-clients.component.scss"],
})
export class AssistantsClientsComponent implements OnInit {
  public breadcrumbDefault: Breadcrumb;
  public pageBasicText = 1;
  public clients;
  public user = new User();
  coreConfig: any;
  menu: any;
  listClients: User[] = [];
  id: any;
  userToAdd = new User();
  userToEdit = new User();
  listCompanies : Company[];
  listAssistants : User[];
  selectedCompany: any;
  selectedAssistant: any;
  response : any;
  editedUserPassword: any;
  confirmedPassword: any;
  public connectedUser = new User();

  constructor(
      private _coreSidebarService: CoreSidebarService,
      private _coreMenuService: CoreMenuService,
      private _coreConfigService: CoreConfigService,
      private userService: UserServiceService,
      private companyService: CompanyService,
      private modalService : NgbModal,
      private _router: Router,
  ) {
    // Set the Menu
    this.menu = assistantMenu;
    this._coreConfigService.setConfig({
      layout: { menu: { collapsed: false } },
    });
    this._coreMenuService.register("assistantMenu", this.menu);
    this._coreMenuService.setCurrentMenu("assistantMenu");

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
    this.breadcrumbDefault = {
      links: [
        {
          name: "Home",
          isLink: true,
          link: "/",
        },
        {
          name: "Assistant",
          isLink: true,
          link: "/assistants/home",
        },
        {
          name: "Clients",
          isLink: false,
        },
      ],
    };
  }

  async ngOnInit(){
   this.connectedUser = await  this.userService.getUser( + localStorage.getItem('connected')) ;
   if(this.connectedUser.role != 'Assistant' )
      this._router.navigate(["/login"]);

    this.userToAdd = new User();
    this.userToEdit = new User();
    this.onGetClients();
    this.listCompanies = await this.companyService.getCompanies();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }
  async onGetClients() {
    this.listClients = await this.userService.getClientsByAssistant(this.connectedUser.id);
  }

  async goToModal(user: User) {
    this.userToEdit = user;
    this.response = '';
  }

  /////////////////
  async onSaveClient() {
    console.log(this.userToAdd);
    console.log(this.selectedCompany);
    this.response = await this.userService.checkUserName(this.userToAdd);
    if (this.response == 'username already used')
      return;

    await this.userService.saveClient(this.userToAdd, this.selectedCompany, this.connectedUser.id);


    this.ngOnInit();
  }

  GetInitials(firstname: string, lastname: string) {
    const initials = firstname.charAt(0) + lastname.charAt(0);
    return initials.toUpperCase();
  }

  modalOpen(modalForm) {
    this.modalService.open(modalForm);
  }

  modalOpenLG(modalLG) {
    this.modalService.open(modalLG, {
      centered: true,
      size: 'lg' // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }

  modalClose(modalForm) {
    console.log(modalForm);
    this.modalService.dismissAll(modalForm);
  }

  goToFichierComponent(a: any) {
    localStorage.setItem('idClient' ,a.id);
    this._router.navigateByUrl('assistants/Fichier');
  }

  async OnEditClient() {
    console.log(this.userToEdit);
    console.log(this.selectedCompany);
    this.response = await this.userService.checkUserName(this.userToAdd);
    if (this.response == 'username already used')
      return;

    await this.userService.editClient(this.userToEdit,this.selectedCompany, this.connectedUser.id);
    this.ngOnInit();
  }

  async onDeleteClient(user : User) {
    if (confirm("Are you sure to delete this company")) {
      await this.userService.deleteUser(user.id);
      this.ngOnInit();

    }
  }

  async onChangePassword() {
    if (this.editedUserPassword == this.confirmedPassword) {
      this.OnEditClient;
      console.log("changed");
    } else console.log("Not Confirmed");
  }

}

