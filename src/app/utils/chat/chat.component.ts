import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router";
import { Breadcrumb } from "../../layout/components/content-header/breadcrumb/breadcrumb.component";
import { CoreMenuService } from "../../../@core/components/core-menu/core-menu.service";
import { CoreConfigService } from "../../../@core/services/config.service";
import { adminMenu } from "../../menu/adminMenu";
import { menu } from "../../menu/menu";
import { assistantMenu } from "app/menu/assistantMenu";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
  encapsulation: ViewEncapsulation.None,
  host: { class: "chat-application" },
})
export class ChatComponent implements OnInit {
  public breadcrumbDefault: Breadcrumb;
  menu: any;
  public selectedUser:number;
  public refresh = true;

  constructor(
    private _coreMenuService: CoreMenuService,
    private _coreConfigService: CoreConfigService,
    private router: Router
  ) {
    let queryString = this.router.url;
    console.log(queryString);

    switch (queryString) {
      case "/chat/admin":
        this.menu = adminMenu;
        this._coreConfigService.setConfig({
          layout: { menu: { collapsed: false } },
        });
        this._coreMenuService.register("adminMenu", this.menu);
        this._coreMenuService.setCurrentMenu("adminMenu");
        break;
      case "/chat/assistants":
        this.menu = assistantMenu;
        this._coreConfigService.setConfig({
          layout: { menu: { collapsed: false } },
        });
        this._coreMenuService.register("assistantMenu", this.menu);
        this._coreMenuService.setCurrentMenu("assistantMenu");
        break;
      case "/chat/clients":
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

  }

  ngOnInit(): void {
    setInterval(() => { this.refresh = !this.refresh }, 5 * 1000);
  }

  selectedId(id) {
    this.selectedUser = id;
  }
}
