import { Component, OnInit } from "@angular/core";
import { CoreMenuService } from "@core/components/core-menu/core-menu.service";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { CoreConfigService } from "@core/services/config.service";
import { Breadcrumb } from "app/layout/components/content-header/breadcrumb/breadcrumb.component";
import { adminMenu } from "app/menu/adminMenu";
import { Company } from "./company";
import { CompanyService } from "./company.service";

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

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreMenuService: CoreMenuService,
    private _coreConfigService: CoreConfigService,
    private companyService: CompanyService
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

  async onGetCompanies() {
    this.listCompanies = await this.companyService.getCompanies();
  }

  async onSaveCompant() {
    await this.companyService.saveCompany(this.company);
  }

  async onEditCompany() {
    await this.companyService.editCompany(this.company);
  }

  async onDeleteCompany(id: number) {
    await this.companyService.deleteCompany(id);
  }

  GetInitials(name) {
    return name.charAt(0).toUpperCase();
  }

  ngOnInit(): void {}

  /**
   * Toggle the sidebar
   *
   * @param key
   */
  toggleSidebar(key): void {
    this._coreSidebarService.getSidebarRegistry(key).toggleOpen();
  }
}
