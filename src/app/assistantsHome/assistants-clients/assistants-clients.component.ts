import { Component, OnInit } from "@angular/core";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { CoreConfigService } from "@core/services/config.service";
import { Breadcrumb } from "app/layout/components/content-header/breadcrumb/breadcrumb.component";
import { assistantMenu } from "app/menu/assistantMenu";
import {Router} from '@angular/router';

@Component({
  selector: "app-assistants-clients",
  templateUrl: "./assistants-clients.component.html",
  styleUrls: ["./assistants-clients.component.scss"],
})
export class AssistantsClientsComponent implements OnInit {
  public breadcrumbDefault: Breadcrumb;
  public pageBasicText = 1;
  public clients;
  coreConfig: any;
  menu: any;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreMenuService: CoreMenuService,
    private _coreConfigService: CoreConfigService,
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

  ngOnInit(): void {
    if (localStorage.getItem('connected') == 'no')
      this._router.navigate(["/login"]);
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  GetInitials(firstname: string, lastname: string) {
    const initials = firstname.charAt(0) + lastname.charAt(0);
    return initials.toUpperCase();
  }
}
