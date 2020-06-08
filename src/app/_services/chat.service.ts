import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { AlertifyService } from './alertify.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl = environment.apiUrl;
  stompClient: any;
  authToken = 'Bearer ' + localStorage.getItem('token');

  constructor(private alertify: AlertifyService, private authService: AuthService) { }

  initializeWebSocketConnection(callback){
    let ws = new SockJS(this.baseUrl + 'taskme?Authorization='+this.authToken);
    this.stompClient = Stomp.over(ws);

    this.stompClient.connect({}, function() {
      callback();
    }, this.alertify.error('Unable to connect to the chat'));
  }

  subscribeToConversation(conversationId, callback){
    this.stompClient.subscribe("/topic/chats." + conversationId, callback);
  }

  sendMessage(conversationId, content){
    var message = {
      content: content,
      sentTime: new Date(),
      conversationId: conversationId,
      userSenderId: this.authService.currentUser.id
    }
    this.stompClient.send("/app/chat.send/" +  conversationId, {}, JSON.stringify(message));
  }

}
