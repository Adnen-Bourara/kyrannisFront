import { Component, OnInit } from "@angular/core";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { CoreConfigService } from "@core/services/config.service";
import { Breadcrumb } from "app/layout/components/content-header/breadcrumb/breadcrumb.component";
import { CoreMenuService } from "../../@core/components/core-menu/core-menu.service";
import { adminMenu } from "../menu/adminMenu";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.scss"],
})
export class AdminComponent implements OnInit {
  public breadcrumbDefault: Breadcrumb;
  menu: any;

  constructor(
    private _coreConfigService: CoreConfigService,
    private _coreMenuService: CoreMenuService
  ) {
    // Set the Menu
    this.menu = adminMenu;
    this._coreConfigService.setConfig({
      layout: { menu: { collapsed: false } },
    });
    this._coreMenuService.register("adminMenu", this.menu);
    this._coreMenuService.setCurrentMenu("adminMenu");

    this.breadcrumbDefault = {
      links: [
        {
          name: "Home",
          isLink: true,
          link: "/",
        },
        {
          name: "Admin",
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
          hidden: false,
        },
        customizer: false,
        enableLocalStorage: true,
      },
    };
  }

  ngOnInit(): void {}
}
