import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Conversation } from 'src/app/_models/Conversation';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Pageable } from 'src/app/_models/Pageable';
import { PaginationInfo } from 'src/app/_models/PaginationInfo';
import { MessageService } from 'src/app/_services/message.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-messages-container',
  templateUrl: './messages-container.component.html',
  styleUrls: ['./messages-container.component.css']
})
export class MessagesContainerComponent implements OnInit {
  @Input() conversation: Conversation;
  @Input() stompClient: any;
  @Output() onSendMessage = new EventEmitter<any>();

  pageable: Pageable;
  paginationInfo: PaginationInfo;
  constructor(private messageService: MessageService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.pageable = new Pageable();
    this.loadMessages(new Pageable(), this.conversation.id);
    this.subscribeToConversation();
  }

  loadMessages(pageable, conversationId) {
    this.messageService.listMessagesWithPagination(pageable, conversationId).subscribe((page: any[]) => {
      this.conversation.messages.unshift(page['content']);
      this.paginationInfo = new PaginationInfo(page);
    }, error => {
      this.alertify.error(error.message);
    });
  }
  subscribeToConversation() {
    this.stompClient.subscribe("/topic/chats." + this.conversation.id, (payload) => {
      var message = JSON.parse(payload.body);
      if(message != null) {
        this.conversation.messages.push(message);
        // var messageElement = that.renderer.createElement('li');

        // //append text to li element
        // that.renderer.appendChild(messageElement, that.renderer.createText(message.content));
        // that.renderer.appendChild(that.divMessages.nativeElement,messageElement);
      }
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
    var user = {id: 1, givenName: 'Emerson', username: 'emerson', address: '', birthDate: 1, contact: '', createdOn: new Date(), familyName: '', profilePhoto: { id: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQF155GQULmsq1dK0a08FjDMBrNn1aiQWMMAzp7i3xAff3y6qA&usqp=CAU', type: 'I', description: 'eu'}};
    var message = {
      content: input.value,
      sender: user,
      type: 'CHAT'
    }
    var param = {
      conversationId: 1,
      message: message,
    }
    this.onSendMessage.emit(param);
    input.value = '';
  }
}
