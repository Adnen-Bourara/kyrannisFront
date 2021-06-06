import { Component, Input, OnInit } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Breadcrumb } from "app/layout/components/content-header/breadcrumb/breadcrumb.component";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreConfigService } from "@core/services/config.service";
import { adminMenu } from "../../menu/adminMenu";
import { UserServiceService } from "app/utils/common/login/user-service.service";
import { User } from "app/utils/common/login/user";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

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

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreMenuService: CoreMenuService,
    private _coreConfigService: CoreConfigService,
    private userService: UserServiceService,
    private modalService : NgbModal
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

  ngOnInit(): void {
    this.onGetClients();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  async onGetClients() {
    this.listClients = await this.userService.getClients();
  }

  async goToModal(user: User) {
    this.user = new User();
    localStorage.setItem("idUser", user.id.toString());
    this.id = localStorage.getItem("idUser");
    this.user = await this.userService.getUser(this.id);
  }

  /////////////////
  async onSaveClient() {
    await this.userService.saveClient(this.user)
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

  async OnEditClient() {
    
  }

  async onDeleteClient(user : User){
    
  }

}
