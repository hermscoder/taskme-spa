import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { AlertifyService } from './alertify.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  baseUrl = environment.apiUrl;
  stompClient: any;
  authToken = 'Bearer ' + localStorage.getItem('token');

  constructor(private alertify: AlertifyService) { }

  initializeWebSocketConnection(){
    let ws = new SockJS(this.baseUrl + 'taskme', null, {
      headers: {'Authorization': this.authToken }
    });
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
    }, this.alertify.error('Unable to connect to the chat'));
  }

  subscribeToConversation(conversationId, callback){
    this.stompClient.subscribe("/topic/chats." + conversationId, callback);
  }

  sendMessage(conversationId, content){
    var message = {
      content: content,
      sentTime: new Date(),
      conversationId: conversationId
    }
    this.stompClient.send("/app/chat.send/" +  conversationId, {}, JSON.stringify(message));
  }

}
