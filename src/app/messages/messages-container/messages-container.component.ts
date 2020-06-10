import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConversationDTO } from 'src/app/_models/ConversationDTO';
import { MessageDTO } from 'src/app/_models/MessageDTO';
import { User } from 'src/app/_models/User';
import { UserDTO } from 'src/app/_models/UserDTO';
import { Pageable } from 'src/app/_models/Pageable';
import { PaginationInfo } from 'src/app/_models/PaginationInfo';
import { MessageService } from 'src/app/_services/message.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ChatService } from 'src/app/_services/chat.service';

@Component({
  selector: 'app-messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.css']
})
export class MessagesContainerComponent implements OnInit {
  @Input() conversation: ConversationDTO;
  @Input() stompClient: any;
  @Input() currentUser: User;
  @Output() onSendMessage = new EventEmitter<any>();

  altreadySubscribed : boolean;
  pageable: Pageable;
  paginationInfo: PaginationInfo;
  constructor(private messageService: MessageService, private alertify: AlertifyService, private chatService: ChatService) { }

  ngOnInit() {
    this.pageable = new Pageable();
  }


  loadMessages(pageable, conversationId) {
    this.messageService.listMessagesWithPagination(pageable, conversationId).subscribe((page: any[]) => {
      this.conversation.messagesList.unshift(page['content']);
      this.paginationInfo = new PaginationInfo(page);
    }, error => {
      this.alertify.error(error.message);
    });
  }

  onInput(event) {
    var textarea = event.target
    if(textarea.value.length > 0){
      textarea.height = 'auto';
      textarea.setAttribute('style', 'height:' + textarea.scrollHeight + 'px;');
    } else {
      textarea.setAttribute('style', 'height:0px;');
    }
  }

  sendMessage(input){
    this.chatService.sendMessage(this.conversation.id, input.value);
    input.value = '';
  }

  getContact(): UserDTO{
    return Object.values(this.conversation.userMap).find(user => user.id != this.currentUser.id);
  }
}
