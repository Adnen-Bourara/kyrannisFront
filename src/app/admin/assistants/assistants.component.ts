import { Component, OnInit } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { Breadcrumb } from "app/layout/components/content-header/breadcrumb/breadcrumb.component";
import { adminMenu } from "app/menu/adminMenu";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreConfigService } from "@core/services/config.service";
import { User } from "app/utils/common/login/user";
import { UserServiceService } from "app/utils/common/login/user-service.service";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-assistants",
  templateUrl: "./assistants.component.html",
})
export class AssistantsComponent implements OnInit {
  public breadcrumbDefault: Breadcrumb;
  public pageBasicText = 1;
  public userToAdd = new User();
  public editedUser = new User();
  coreConfig: any;
  menu: any;
  id: any;
  listAssistants: User[] = [];

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreMenuService: CoreMenuService,
    private _coreConfigService: CoreConfigService,
    private userService: UserServiceService,
    private modalService: NgbModal
  ) {
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
          name: "Acceuil",
          isLink: true,
          link: "/admin/home",
        },
        {
          name: "Assistants",
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

  ngOnInit(): void {
    this.onGetAssistants();
  }

  async onGetAssistants() {
    this.listAssistants = await this.userService.getAssistants();
    console.log(this.listAssistants);
  }

  /**
   * Toggle the sidebar
   *
   * @param key
   */
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  async goToModal(user: User) {
    this.editedUser = user;
  }

  async onSaveAssistant() {
    await this.userService.saveAssistant(this.userToAdd);
    this.ngOnInit();
  }

  GetInitials(firstname: string, lastname: string) {
    const initials = firstname.charAt(0) + lastname.charAt(0);
    return initials.toUpperCase();
  }
  modalOpen(modalForm) {
    console.log(modalForm);
    this.modalService.open(modalForm);
  }

  modalOpenLG(modalLG) {
    this.modalService.open(modalLG, {
      centered: true,
      size: "lg", // size: 'xs' | 'sm' | 'lg' | 'xl'
    });
  }

  async onEditAssistant(editedUser: User) {
    await this.userService.editUser(this.editedUser);
    this.ngOnInit();
  }

  async onDeleteUser(user: User) {
    this.userService.deleteUser(user.id);
    this.ngOnInit();
  }
}
