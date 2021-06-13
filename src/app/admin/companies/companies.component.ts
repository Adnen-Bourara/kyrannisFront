import { Component, OnInit } from "@angular/core";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { CoreConfigService } from "@core/services/config.service";
import { Breadcrumb } from "app/layout/components/content-header/breadcrumb/breadcrumb.component";
import { adminMenu } from "app/menu/adminMenu";
import { Company } from "./company";
import { CompanyService } from "./company.service";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {User} from '../../utils/common/login/user';
import {UserServiceService} from '../../utils/common/login/user-service.service';
import {Router} from '@angular/router';

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.scss"],
})
export class CompaniesComponent implements OnInit {
  public breadcrumbDefault: Breadcrumb;
  public pageBasicText = 1;
  public company = new Company();
  coreConfig: any;
  menu: any;
  listCompanies: Company[] = [];
  newSociete = new Company ();
  modifSociete = new Company ();
  public connectedUser = new User();

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreMenuService: CoreMenuService,
    private _coreConfigService: CoreConfigService,
    private companyService: CompanyService,
    private modalService: NgbModal,
    private userService: UserServiceService,
    private _router: Router,
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


  modalOpen(modalForm) {
    console.log(modalForm);
    this.modalService.open(modalForm);
  }

   goToModal(a: any) {
    this.modifSociete = a;
  }

  async onGetCompanies() {
    this.listCompanies = await this.companyService.getCompanies();
  this.listCompanies.forEach(async a => {
    a.listClient = await this.userService.getClientsByCompany(a.id);
  })
  }

  async onSaveCompant() {
    await this.companyService.saveCompany(this.newSociete);
    this.ngOnInit();
  }

  async onEditCompany() {
    await this.companyService.editCompany(this.modifSociete);
    this.ngOnInit();
  }

  async onDeleteCompany(id: number) {
    if(confirm("Are you sure to delete this company")) {
      await this.companyService.deleteCompany(id);
    this.ngOnInit();
    }

  }

  GetInitials(name) {
    return name.charAt(0).toUpperCase();
  }

  async ngOnInit() {
    this.connectedUser = await  this.userService.getUser( + localStorage.getItem('connected')) ;
    if(this.connectedUser.role != 'SuperAdmin' )
      this._router.navigate(["/login"]);
    await this.onGetCompanies();
  }

  /**
   * Toggle the sidebar
   *
   * @param key
   */
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }


}
