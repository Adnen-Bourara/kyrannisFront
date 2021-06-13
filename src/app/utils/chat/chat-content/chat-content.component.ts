import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { ChatService } from '../chat.service';
import {UserServiceService} from '../../common/login/user-service.service';
import {MessageService} from '../../../admin/messaging/message.service';
import {User} from '../../common/login/user';
import {Message} from '../../../admin/messaging/message';

@Component({
  selector: 'app-chat-content',
  templateUrl: './chat-content.component.html'
})
export class ChatContentComponent implements OnInit, OnChanges {
  // Decorator
  @ViewChild('scrollMe') scrollMe: ElementRef;
  @Input() idSelected : number;
  @Input() refresh : boolean;
  scrolltop: number = null;

  // Public
  public activeChat: Boolean;
  public chats: Message[];
  public chatUser = new User();
  public userProfile = new User();
  public chatMessage = new Message();
  public newChat;
  public date1:any;
  public date2:any;


  /**
   * Constructor
   *
   * @param {ChatService} _chatService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _chatService: ChatService, private userService: UserServiceService, private messageService: MessageService , private _coreSidebarService: CoreSidebarService) {}

  // Public Methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * Toggle Sidebar
   *
   * @param name
   */
  toggleSidebar(name) {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
 async  ngOnInit() {
   this.userProfile = await this.userService.getUser( + localStorage.getItem('connected'));

   }





  async ngOnChanges(changes: SimpleChanges){

    if (this.idSelected) {
      this.chatUser = await this.userService.getUser(this.idSelected);
      this.activeChat = true;
      this.chats = await this.messageService.getConversation(this.userProfile.id, this.chatUser.id);
      this.chats.sort((a, b) => {  this.date1 = new Date(a.dateEnvoie) ;
     this.date2 = new Date(b.dateEnvoie) ;
      return this.date1 - this.date2
      });
      this.chatMessage = new Message();
    }

    console.log(this.chats);

  }

  GetInitials(firstname: string, lastname: string) {
    const initials = firstname.charAt(0) + lastname.charAt(0);
    return initials.toUpperCase();
  }

  async sendMessage() {
   this.chatMessage.dateEnvoie = new Date().toString();
  this.newChat = await this.messageService.sendMessage(this.chatMessage, this.userProfile.id, this.chatUser.id);

  this.chats.push(this.newChat);
    this.chatMessage = new Message();
   console.log(this.chatMessage);
  }

}
