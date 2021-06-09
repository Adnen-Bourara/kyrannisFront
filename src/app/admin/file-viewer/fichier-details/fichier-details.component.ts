import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CoreMenuService } from '@core/components/core-menu/core-menu.service';
import { CoreConfigService } from '@core/services/config.service';
import { adminMenu } from 'app/menu/adminMenu';
import { UserServiceService } from 'app/utils/common/login/user-service.service';
import { FichierService } from '../fichier.service';

@Component({
  selector: 'app-fichier-details',
  templateUrl: './fichier-details.component.html',
  styleUrls: ['./fichier-details.component.scss']
})
export class FichierDetailsComponent implements OnInit {
  menu: any;
  breadcrumbDefault: { links: ({ name: string; isLink: boolean; link: string; } | { name: string; isLink: boolean; link?: undefined; })[]; };
  file: any;

  constructor(
    private _coreMenuService: CoreMenuService,
    private _coreConfigService: CoreConfigService,
    private router: Router,
    private fichierService: FichierService,
    private userService: UserServiceService,
  )
  {
    let queryString = this.router.url;
    console.log(queryString);

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
          name: "Fichiers",
          isLink: true,
          link: "/admin/Fichier",

        },
        {
          name: "Détail du Fichier",
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
    this.onGetFile();
  }

  onGetFile(){
    this.file = this.fichierService.getById(parseInt(localStorage.getItem("idFichier")));
    console.log(this.file);
  }

}
