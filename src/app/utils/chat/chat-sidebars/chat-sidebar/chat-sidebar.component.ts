import {Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges} from '@angular/core';

import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { ChatService } from '../../chat.service';
import {UserServiceService} from '../../../common/login/user-service.service';
import {User} from '../../../common/login/user';
import {MessageService} from '../../../../admin/messaging/message.service';
import {element} from 'protractor';


@Component({
  selector: 'app-chat-sidebar',
  templateUrl: './chat-sidebar.component.html'
})
export class ChatSidebarComponent implements OnInit , OnChanges {
  // Public
  public contacts : User[];
  public chatUsers : User[];
  public searchText;
  public chats;
  public selectedIndex = null;
  public idConnected;
  public receivedMessages =[];



  /**
   * Constructor
   *
   * @param {ChatService} _chatService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _chatService: ChatService, private messageService: MessageService , private userService: UserServiceService, private _coreSidebarService: CoreSidebarService) {}
    @Output() selectedChat = new EventEmitter();
  @Input() refresh : boolean;
  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Open Chat
   *
   * @param id
   * @param newChat
   */
  openChat(id) {
      console.log(id);
      this._chatService.openChat(id);
    this.selectedChat.emit(id);
  }

  /**
   * Toggle Sidebar
   *
   * @param name
   */
  toggleSidebar(name) {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Set Index
   *
   * @param index
   */
  setIndex(index: number) {
    this.selectedIndex = index;
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
 async ngOnInit(){
  this.idConnected = localStorage.getItem('connected');
    // Subscribe to contacts
    this.contacts  = await this.userService.getAllUsers();
    this.contacts.forEach((u, index) => {
      if (u.id == this.idConnected)
        this.contacts.splice(index,1);
    } );


      this.chatUsers = await this.messageService.getConversations( this.idConnected );
      for (const value of this.chatUsers) {
        this.receivedMessages = await this.messageService.checkIfNewMessage(value.id, this.idConnected);
        for (const a of this.receivedMessages) {
          if (a['seen'] == 'False')
            this.chatUsers[this.chatUsers.indexOf(value)]['new'] = 'True';
        }
      }
    console.log(this.chatUsers);



    // Subscribe to selected Chats
    this._chatService.onSelectedChatChange.subscribe(res => {
      this.chats = res;
    });
  }

  GetInitials(firstname: string, lastname: string) {
    const initials = firstname.charAt(0) + lastname.charAt(0);
    return initials.toUpperCase();
  }

  async ngOnChanges(changes: SimpleChanges){
    this.chatUsers = await this.messageService.getConversations( this.idConnected );
    for (const value of this.chatUsers) {
      this.receivedMessages = await this.messageService.checkIfNewMessage(value.id, this.idConnected);
      for (const a of this.receivedMessages) {
        if (a['seen'] == 'False')
          this.chatUsers[this.chatUsers.indexOf(value)]['new'] = 'True';
      }
    }
    console.log(this.chatUsers);
  }
}
