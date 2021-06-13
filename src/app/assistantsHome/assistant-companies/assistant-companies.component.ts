import { Component, OnInit } from '@angular/core';
import {Breadcrumb} from '../../layout/components/content-header/breadcrumb/breadcrumb.component';
import {Company} from '../../admin/companies/company';
import {CoreSidebarService} from '../../../@core/components/core-sidebar/core-sidebar.service';
import {CoreMenuService} from '../../../@core/components/core-menu/core-menu.service';
import {CoreConfigService} from '../../../@core/services/config.service';
import {CompanyService} from '../../admin/companies/company.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {UserServiceService} from '../../utils/common/login/user-service.service';
import {Router} from '@angular/router';
import {adminMenu} from '../../menu/adminMenu';
import {assistantMenu} from '../../menu/assistantMenu';
import {User} from '../../utils/common/login/user';

@Component({
  selector: 'app-assistant-companies',
  templateUrl: './assistant-companies.component.html',
  styleUrls: ['./assistant-companies.component.scss']
})
export class AssistantCompaniesComponent implements OnInit {
  public breadcrumbDefault: Breadcrumb;
  public pageBasicText = 1;
  public company = new Company();
  coreConfig: any;
  menu: any;
  listCompanies: Company[] = [];
  newSociete = new Company ();
  modifSociete = new Company ();
  connectedUser = new User();
  constructor(
      private _coreSidebarService: CoreSidebarService,
      private _coreMenuService: CoreMenuService,
      private _coreConfigService: CoreConfigService,
      private companyService: CompanyService,
      private modalService: NgbModal,
      private userService: UserServiceService,
      private _router: Router,
  ) {
    this.menu = assistantMenu;
    this._coreConfigService.setConfig({
      layout: { menu: { collapsed: false } },
    });

    this._coreMenuService.register("Menu", this.menu);
    this._coreMenuService.setCurrentMenu("Menu");


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
    if(this.connectedUser.role != 'Assistant' )
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
