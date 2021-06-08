import { Component, EventEmitter, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { CoreConfigService } from "@core/services/config.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Breadcrumb } from "app/layout/components/content-header/breadcrumb/breadcrumb.component";
import { adminMenu } from "app/menu/adminMenu";
import { assistantMenu } from "app/menu/assistantMenu";
import { menu } from "app/menu/menu";

@Component({
  selector: "app-file-viewer",
  templateUrl: "./file-viewer.component.html",
  styleUrls: ["./file-viewer.component.scss"],
})
export class FileViewerComponent implements OnInit {
  public breadcrumbDefault: Breadcrumb;
  public pageBasicText = 1;
  coreConfig: any;
  menu: any;
  files = [
    {
      id: "0",
      fileName: "BilanMaison.exc",
      type: "Excel",
      client: "to to",
      assistantOccupied: "Amine Drawil",
    },
    {
      id: "1",
      fileName: "ContratOfficiel.pdf",
      type: "Pdf",
      client: "to to",

      assistantOccupied: "Ahmed toto",
    },
    {
      id: "2",
      fileName: "Devis.wd",
      type: "Word",
      client: "to to",

      assistantOccupied: "Salem toto",
    },
    {
      id: "3",
      fileName: "Officel.exc",
      type: "Excel",
      client: "to to",

      assistantOccupied: "Amine Drawil",
    },
    {
      id: "4",
      fileName: "Facture.exc",
      type: "Excel",
      client: "to to",

      assistantOccupied: "toto toto",
    },
    {
      id: "5",
      fileName: "finalContract.pdf",
      type: "Pdf",
      client: "to to",

      assistantOccupied: "Amine Drawil",
    },
  ];
  showedName = "Choisissez votre fichier";

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreMenuService: CoreMenuService,
    private _coreConfigService: CoreConfigService,
    private router: Router,
    private modalService: NgbModal
  ) {
    let queryString = this.router.url;
    console.log(queryString);

    switch (queryString) {
      case "/admin/viewfiles":
        this.menu = adminMenu;
        this._coreConfigService.setConfig({
          layout: { menu: { collapsed: false } },
        });
        this._coreMenuService.register("adminMenu", this.menu);
        this._coreMenuService.setCurrentMenu("adminMenu");
        break;
      case "/assistants/viewfiles":
        this.menu = assistantMenu;
        this._coreConfigService.setConfig({
          layout: { menu: { collapsed: false } },
        });
        this._coreMenuService.register("assistantMenu", this.menu);
        this._coreMenuService.setCurrentMenu("assistantMenu");
        break;
      case "/clients/viewfiles":
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
          name: "Fichiers",
          isLink: false,
        },
        {
          name: "Consulter Fichiers",
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

  ngOnInit(): void {}

  onGetAssistants() {}

  /**
   * Toggle the sidebar
   *
   * @param key
   */
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      console.log(event.target.files[0].name);
      this.showedName = event.target.files[0].name ;
    }
  }

  GetInitials(name: string) {
    const thefullname = name.split(" ");
    const initials =
      thefullname.shift().charAt(0) + thefullname.pop().charAt(0);
    return initials.toUpperCase();
  }

  modalOpen(modalForm) {
    console.log(modalForm);
    this.modalService.open(modalForm);
  }
  modalClose(modalForm) {
    console.log(modalForm);
    this.modalService.dismissAll(modalForm);
  }
  modalOpenLG(modalLG) {
    this.modalService.open(modalLG, {
      centered: true,
      size: "lg", // size: 'xs' | 'sm' | 'lg' | 'xl'
      windowClass: "modal modal-info",
    });
  }
}
