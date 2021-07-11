import { Component, OnInit, ViewEncapsulation } from "@angular/core";

import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { FlatpickrOptions } from "ng2-flatpickr";

import { AccountSettingsService } from "./account-settings.service";
import { Breadcrumb } from "app/layout/components/content-header/breadcrumb/breadcrumb.component";
import { Router } from "@angular/router";
import { adminMenu } from "app/menu/adminMenu";
import { CoreConfigService } from "@core/services/config.service";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { menu } from "app/menu/menu";
import { assistantMenu } from "app/menu/assistantMenu";
import {User} from '../common/login/user';
import {UserServiceService} from '../common/login/user-service.service';
@Component({
  selector: "app-account-settings",
  templateUrl: "./account-settings.component.html",
  styleUrls: ["./account-settings.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AccountSettingsComponent implements OnInit {
  // public
  public contentHeader: object;
  public data: any;
  public birthDateOptions: FlatpickrOptions = {
    altInput: true,
  };
  public passwordTextTypeNew: any;
  public passwordTextTypeRetype : any;


  // private
  menu: any;
  public connectedUser = new User();
  /**
   * Constructor
   *
   * @param {AccountSettingsService} _accountSettingsService
   */
  constructor(
    private _accountSettingsService: AccountSettingsService,
    private router: Router,
    private _coreConfigService: CoreConfigService,
    private _coreMenuService: CoreMenuService,
    private userService: UserServiceService,
    private _router: Router,
  ) {
    let queryString = this.router.url;
    console.log(queryString);

    switch (queryString) {
      case "/admin/settings":
        this.menu = adminMenu;
        this._coreConfigService.setConfig({
          layout: { menu: { collapsed: false } },
        });
        this._coreMenuService.register("adminMenu", this.menu);
        this._coreMenuService.setCurrentMenu("adminMenu");
        break;
      case "/assistants/settings":
        this.menu = assistantMenu;
        this._coreConfigService.setConfig({
          layout: { menu: { collapsed: false } },
        });
        this._coreMenuService.register("assistantMenu", this.menu);
        this._coreMenuService.setCurrentMenu("assistantMenu");
        break;
      case "/clients/settings":
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

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle Password Text Type Old
   */



  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  async ngOnInit() {
    this.connectedUser = await  this.userService.getUser( + localStorage.getItem('connected')) ;

  }

 async editConnected()
  {
    await this.userService.editUser(this.connectedUser);
  }

  async updatePassword() {
    await this.userService.changePassword(this.connectedUser.id, this.passwordTextTypeNew);
  }
}
