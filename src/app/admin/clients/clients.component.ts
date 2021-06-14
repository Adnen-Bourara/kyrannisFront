import { Component, Input, OnInit } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Breadcrumb } from "app/layout/components/content-header/breadcrumb/breadcrumb.component";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreConfigService } from "@core/services/config.service";
import { adminMenu } from "../../menu/adminMenu";
import { UserServiceService } from "app/utils/common/login/user-service.service";
import { User } from "app/utils/common/login/user";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import {CompanyService} from '../companies/company.service';
import {Company} from '../companies/company';
import {Router} from '@angular/router';

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
})
export class ClientsComponent implements OnInit {
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
    this.menu = adminMenu;
    this._coreConfigService.setConfig({
      layout: { menu: { collapsed: false } },
    });
    this._coreMenuService.register("adminMenu", this.menu);
    this._coreMenuService.setCurrentMenu("adminMenu");

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
          name: "Admin",
          isLink: true,
          link: "/admin",
        },
        {
          name: "Clients",
          isLink: false,
        },
      ],
    };
  }

  async ngOnInit() {
    this.connectedUser = await  this.userService.getUser( + localStorage.getItem('connected')) ;
    if(this.connectedUser.role != 'SuperAdmin' )
      this._router.navigate(["/login"]);

    this.userToAdd = new User();
    this.userToEdit = new User();
    this.onGetClients();
    this.listCompanies = await this.companyService.getCompanies();
    this.listAssistants = await this.userService.getAssistants();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  async onGetClients() {
    this.listClients = await this.userService.getClients();
  }

  async goToModal(user: User) {
 this.userToEdit = user;
    this.response = '';
  }

  /////////////////
  async onSaveClient() {
    console.log(this.userToAdd);
    console.log(this.selectedCompany);
    console.log(this.selectedAssistant);
    this.response = await this.userService.checkUserName(this.userToAdd);
    if (this.response == 'username already used')
    return;

    await this.userService.saveClient(this.userToAdd, this.selectedCompany, this.selectedAssistant);

    console.log("done");
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
    this._router.navigateByUrl('admin/Fichier');
  }

  async OnEditClient() {
    console.log(this.userToEdit);
    console.log(this.selectedCompany);
    console.log(this.selectedAssistant);
    this.response = await this.userService.checkUserName(this.userToAdd);
    if (this.response == 'username already used')
      return;

    await this.userService.editClient(this.userToEdit,this.selectedCompany,this.selectedAssistant);
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
