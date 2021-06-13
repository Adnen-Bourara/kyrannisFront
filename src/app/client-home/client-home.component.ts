import { Component, OnInit } from '@angular/core';
import {User} from '../utils/common/login/user';
import {UserServiceService} from '../utils/common/login/user-service.service';
import {Router} from '@angular/router';
import {CoreSidebarService} from '../../@core/components/core-sidebar/core-sidebar.service';
import {CoreMenuService} from '../../@core/components/core-menu/core-menu.service';
import {CoreConfigService} from '../../@core/services/config.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FichierService} from '../admin/file-viewer/fichier.service';
import {Breadcrumb} from '../layout/components/content-header/breadcrumb/breadcrumb.component';
import {Fichier} from '../admin/file-viewer/fichier';
import {menu} from '../menu/menu';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.scss']
})
export class ClientHomeComponent implements OnInit {
    public breadcrumbDefault: Breadcrumb;
    public pageBasicText = 1;
    coreConfig: any;
    menu: any;


    public connectedUser = new User();
  constructor(private _coreSidebarService: CoreSidebarService,
              private _coreMenuService: CoreMenuService,
              private _coreConfigService: CoreConfigService,
              private router: Router,
              private modalService: NgbModal,
              private fichierService: FichierService,
              private userService: UserServiceService,
              private _router: Router,)   {
      this.menu = menu;
      this._coreConfigService.setConfig({
          layout: { menu: { collapsed: false } },
      });
      this._coreMenuService.register("clientMenu", this.menu);
      this._coreMenuService.setCurrentMenu("clientMenu");


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

 async ngOnInit() {
    this.connectedUser = await  this.userService.getUser( + localStorage.getItem('connected')) ;
    if(this.connectedUser.role != 'Client' )
      this._router.navigate(["/login"]);
  }

}
