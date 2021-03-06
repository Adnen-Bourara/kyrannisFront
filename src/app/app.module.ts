import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { FakeDbService } from "@fake-db/fake-db.service";
import { fakeBackendProvider } from "app/auth/helpers"; // used to create fake backend
import { JwtInterceptor, ErrorInterceptor } from "app/auth/helpers";

import "hammerjs";
import { NgbModal, NgbModalModule, NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { TranslateModule } from "@ngx-translate/core";
import { ToastrModule } from "ngx-toastr"; // For auth after login toast

import { CoreModule } from "@core/core.module";
import { CoreCommonModule } from "@core/common.module";
import { CoreSidebarModule, CoreThemeCustomizerModule } from "@core/components";

import { coreConfig } from "app/app-config";

import { AppComponent } from "app/app.component";
import { LayoutModule } from "app/layout/layout.module";
import { SampleModule } from "app/main/sample/sample.module";
import { LoginComponent } from "./utils/common/login/login.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";


import { CommonModule } from "@angular/common";
import { NgSelectModule } from "@ng-select/ng-select";
import { ErrorComponent } from "./utils/common/error/error.component";
import { ClientsComponent } from "./admin/clients/clients.component";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { BreadcrumbModule } from "./layout/components/content-header/breadcrumb/breadcrumb.module";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { AdminComponent } from "./admin/admin.component";
import { FileViewerComponent } from "./admin/file-viewer/file-viewer.component";
import { AssistantsComponent } from "./admin/assistants/assistants.component";
import { ContentHeaderModule } from "./layout/components/content-header/content-header.module";
import { AccountSettingsComponent } from "./utils/account-settings/account-settings.component";
import { AccountSettingsService } from "./utils/account-settings/account-settings.service";
import { AssistantsHomeComponent } from "./assistantsHome/assistants-home/assistants-home.component";
import { AssistantsClientsComponent } from "./assistantsHome/assistants-clients/assistants-clients.component";
import { CompaniesComponent } from "./admin/companies/companies.component";
import { FichierDetailsComponent } from './admin/file-viewer/fichier-details/fichier-details.component';
import { AssistantCompaniesComponent } from './assistantsHome/assistant-companies/assistant-companies.component';
import { AssistantsFileViewerComponent } from './assistantsHome/assistants-file-viewer/assistants-file-viewer.component';
import { AssistantFichierDetailsComponent } from './assistantsHome/assistants-file-viewer/assistant-fichier-details/assistant-fichier-details.component';
import { ClientHomeComponent } from './client-home/client-home.component';
import { ClientFileViewerComponent } from './client-home/client-file-viewer/client-file-viewer.component';
import { ClientFileDetailsComponent } from './client-home/client-file-viewer/client-file-details/client-file-details.component';

const appRoutes: Routes = [

  {
    path: "login",
    component: LoginComponent,
  },
  // Admin Routes
  {
    path: "admin/Home",
    component: AdminComponent,
  },
  {
    path: "admin/assistants",
    component: AssistantsComponent,
  },
  {
    path: "admin/clients",
    component: ClientsComponent,
  },
  {
    path: "admin/companies",
    component: CompaniesComponent,
  },
  {
    path: "admin/Fichier",
    component: FileViewerComponent,
  },

  {
    path: 'admin/Fichier/more',
    component: FichierDetailsComponent,
  },

  {
    path: "admin/settings",
    component: AccountSettingsComponent,
    resolve: {
      accountSetting: AccountSettingsService,
    },
  },


  // Assistants Routes
  {
    path: "assistants/Home",
    component: AssistantsHomeComponent,
  },
  {
    path: "assistants/companies",
    component: AssistantCompaniesComponent,
  },
  {
    path: "assistants/clients",
    component: AssistantsClientsComponent,
  },
  {
    path: "assistants/Fichier",
    component: AssistantsFileViewerComponent,
  },

  {
    path: "assistants/Fichier/More",
    component: AssistantFichierDetailsComponent,
  },
  {
    path: "assistants/settings",
    component: AccountSettingsComponent,
    resolve: {
      accountSetting: AccountSettingsService,
    },
  },
  {
    path: "assistants/viewfiles",
    component: AssistantsFileViewerComponent,
  },

  // Clients Routes
  {
    path: "clients/Home",
    component: ClientHomeComponent,
  },
  {
    path: "clients/Fichier",
    component: ClientFileViewerComponent,
  },
  {
    path: "clients/Fichier/More",
    component: ClientFileDetailsComponent,
  },
  {
    path: "clients/settings",
    component: AccountSettingsComponent,
    resolve: {
      accountSetting: AccountSettingsService,
    },
  },
  // Common Routes

  {
    path: "chat",
    loadChildren: () =>
      import("./utils/chat/chat.module").then((m) => m.ChatModule),
  },

  {
    path: "error",
    component: ErrorComponent,
  },
  {
    path: "",
    redirectTo: "/login",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/error", //Error 404 - Page not found
  },
];

@NgModule({
  declarations: [
    AppComponent,
    AssistantsComponent,
    LoginComponent,
    ErrorComponent,
    ClientsComponent,
    AdminComponent,
    FileViewerComponent,
    AccountSettingsComponent,
    AssistantsHomeComponent,
    AssistantsClientsComponent,
    CompaniesComponent,
    FichierDetailsComponent,
    AssistantCompaniesComponent,
    AssistantsFileViewerComponent,
    AssistantFichierDetailsComponent,
    ClientHomeComponent,
    ClientFileViewerComponent,
    ClientFileDetailsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModalModule,
    BrowserAnimationsModule,
    FormsModule,
    PerfectScrollbarModule,
    BreadcrumbModule,
    CommonModule,
    ContentHeaderModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(FakeDbService, {
      delay: 0,
      passThruUnknownUrl: true,
    }),
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: "enabled", // Add options right here
      relativeLinkResolution: "legacy",
    }),
    NgSelectModule,
    NgxDatatableModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: "enabled", // Add options right here
      relativeLinkResolution: "legacy",
    }),
    TranslateModule.forRoot(),

    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot(),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule,

    // App modules
    LayoutModule,
    SampleModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AccountSettingsService,

    // provider used to create fake backend, comment while using real api
    fakeBackendProvider,
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
