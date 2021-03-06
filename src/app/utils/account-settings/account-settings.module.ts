import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AuthGuard } from "app/auth/helpers/auth.guards";
import { CoreCommonModule } from "@core/common.module";
import { ContentHeaderModule } from "app/layout/components/content-header/content-header.module";

import { AccountSettingsComponent } from "./account-settings.component";
import { AccountSettingsService } from "./account-settings.service";

const routes: Routes = [
  {
    path: "**",
    component: AccountSettingsComponent,
  },
];

@NgModule({
  declarations: [AccountSettingsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    CoreCommonModule,
    ContentHeaderModule,
  ],

  providers: [AccountSettingsService],
})
export class AccountSettingsModule {}
