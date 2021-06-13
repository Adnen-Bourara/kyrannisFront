import { Component, OnInit } from "@angular/core";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreConfigService } from "@core/services/config.service";
import { Breadcrumb } from "app/layout/components/content-header/breadcrumb/breadcrumb.component";
import { adminMenu } from "app/menu/adminMenu";
import { assistantMenu } from "app/menu/assistantMenu";
import {Router} from '@angular/router';
import {User} from '../../utils/common/login/user';
import {UserServiceService} from '../../utils/common/login/user-service.service';

@Component({
  selector: "app-assistants-home",
  templateUrl: "./assistants-home.component.html",
  styleUrls: ["./assistants-home.component.scss"],
})
export class AssistantsHomeComponent implements OnInit {
  public breadcrumbDefault: Breadcrumb;
  menu: any;
  public connectedUser = new User();

  constructor(
    private _coreConfigService: CoreConfigService,
    private _coreMenuService: CoreMenuService,
    private userService: UserServiceService,
    private _router: Router,
  ) {
    // Set the Menu
    this.menu = assistantMenu;
    this._coreConfigService.setConfig({
      layout: { menu: { collapsed: false } },
    });
    this._coreMenuService.register("assistantMenu", this.menu);
    this._coreMenuService.setCurrentMenu("assistantMenu");

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

  async ngOnInit() {
    this.connectedUser = await  this.userService.getUser( + localStorage.getItem('connected')) ;
    if(this.connectedUser.role != 'Assistant' )
      this._router.navigate(["/login"]);
  }
}
