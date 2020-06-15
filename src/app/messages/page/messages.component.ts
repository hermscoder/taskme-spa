import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as Stomp from 'stompjs';
import { environment } from 'src/environments/environment';
import { MessageDTO } from 'src/app/_models/MessageDTO';
import { ConversationDTO } from 'src/app/_models/ConversationDTO';
import { UserDTO } from 'src/app/_models/UserDTO';
import { User } from 'src/app/_models/User';
import { ConversationService } from 'src/app/_services/conversation.service';
import { ChatService } from 'src/app/_services/chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @ViewChild('inputMsg') input: ElementRef;

  conversations: ConversationDTO[] = [];
  selectedConversation: ConversationDTO;
  user: User;

  constructor(private route: ActivatedRoute, private renderer: Renderer2, private conversationService: ConversationService, private chatService: ChatService) { }

  ngOnInit() {
    var that = this;
    this.route.data.subscribe(data => {
      this.user = data['user'];

      that.conversationService.getUserConversations().subscribe((conversations: any[]) => {
        this.chatService.initializeWebSocketConnection(() => {
          that.conversations = conversations;
          this.subscribeToAllConversations(that.conversations);
          this.route.params.subscribe(value => {
            if(value.participantName != null){
              this.selectedConversation = that.conversations.find(item => item.participants.some(part => part.givenName.toUpperCase().indexOf(value.participantName.toUpperCase()) > -1));
            }
          });
        });
      });
    });

  }

  subscribeToAllConversations(conversations) {
    for(var conversation of conversations){
      this.chatService.subscribeToConversation(conversation.id, (payload) => {
        var message = JSON.parse(payload.body);
        var targetConversation = this.conversations.find((conv) => conv.id == message.conversationId);
        if(message != null) {
          let lastMessage = this.getLastMessage(targetConversation);

          message.lastMessageFromSameUser = lastMessage != null && lastMessage.userSenderId == message.userSenderId

          targetConversation.messagesList.push(message);  
        }
      });
    }
  }

  openConversation(conversation){
    this.selectedConversation = conversation;
  }

  toggleUntoggleConversations(element){
    if(element.style.display != "block"){
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }

  getLastMessage(conversation: ConversationDTO): MessageDTO{
    return conversation.messagesList[conversation.messagesList.length-1];
  }
}
