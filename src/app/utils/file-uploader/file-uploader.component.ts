import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Router } from "@angular/router";

import { FileUploader } from "ng2-file-upload";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreConfigService } from "@core/services/config.service";
import { adminMenu } from "app/menu/adminMenu";
import { menu } from "app/menu/menu";
import { assistantMenu } from "app/menu/assistantMenu";

const URL = "https://your-url.com";

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploaderComponent implements OnInit {
  // public
  public contentHeader: object;
  public hasAnotherDropZoneOver: boolean = false;
  public hasBaseDropZoneOver: boolean = false;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    isHTML5: true,
  });
  menu: any;

  // Public Methods
  // -----------------------------------------------------------------------------------------------------
  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  constructor(
    private _coreMenuService: CoreMenuService,
    private _coreConfigService: CoreConfigService,
    private router: Router

  ) {
    let queryString = this.router.url;
    console.log(queryString);

    switch (queryString) {
      case "/upload/admin":
        this.menu = adminMenu;
        this._coreConfigService.setConfig({
          layout: { menu: { collapsed: false } },
        });
        this._coreMenuService.register("adminMenu", this.menu);
        this._coreMenuService.setCurrentMenu("adminMenu");
        break;
      case "/upload/assistant":
        this.menu = assistantMenu;
        this._coreConfigService.setConfig({
          layout: { menu: { collapsed: false } },
        });
        this._coreMenuService.register("assistantMenu", this.menu);
        this._coreMenuService.setCurrentMenu("assistantMenu");
        break;
      case "/upload/clients":
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

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // content header
    if (localStorage.getItem('connected') == 'no')
    this.router.navigate(["/login"]);
    
    this.contentHeader = {
      headerTitle: "Envoyer vos Fichiers",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/",
          },
          {
            name: "Fichiers",
            isLink: true,
            link: "/",
          },
          {
            name: "Envoyer Fichiers",
            isLink: false,
          },
        ],
      },
    };
  }
}
