import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { CoreSidebarModule } from '@core/components';
import { CoreCommonModule } from '@core/common.module';

import { ChatContentComponent } from './chat-content/chat-content.component';
import { ChatSidebarComponent } from './chat-sidebars/chat-sidebar/chat-sidebar.component';
import { ChatUserSidebarComponent } from './chat-sidebars/chat-user-sidebar/chat-user-sidebar.component';
import { ChatActiveSidebarComponent } from './chat-sidebars/chat-active-sidebar/chat-active-sidebar.component';
import { ChatComponent } from './chat.component';
import { ChatService } from './chat.service';
import { BreadcrumbModule } from 'app/layout/components/content-header/breadcrumb/breadcrumb.module';

// routing
const routes: Routes = [
  {
    path: 'admin',
    component: ChatComponent,
    resolve: {
      chatData: ChatService
    }
  },{
    path: 'assistants',
    component: ChatComponent,
    resolve: {
      chatData: ChatService
    }
  },{
    path: 'clients',
    component: ChatComponent,
    resolve: {
      chatData: ChatService
    }
  }
];

@NgModule({
  declarations: [
    ChatComponent,
    ChatContentComponent,
    ChatSidebarComponent,
    ChatUserSidebarComponent,
    ChatActiveSidebarComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    CoreSidebarModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    PerfectScrollbarModule,
    NgbModule
  ],
  providers: [ChatService]
})
export class ChatModule {}
