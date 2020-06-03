import { Component, OnInit, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { Message } from 'src/app/_models/Message';
import { Conversation } from 'src/app/_models/Conversation';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @ViewChild('inputMsg') input: ElementRef;
  @ViewChild("divMessages") divMessages: ElementRef;
  private title = 'WebSockets chat';

  stompClient: any;
  conversations: Conversation[] = [];
  selectedConversation: Conversation;

  constructor(private renderer: Renderer2) {
    this.initializeWebSocketConnection();
   }

  ngOnInit() {
    var user = {id: 1, givenName: 'Emerson', username: 'emerson', address: '', birthDate: 1, contact: '', createdOn: new Date(), familyName: '', profilePhoto: { id: 1, url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQQF155GQULmsq1dK0a08FjDMBrNn1aiQWMMAzp7i3xAff3y6qA&usqp=CAU', type: 'I', description: 'eu'}};
    var user2 = {id: 2, givenName: 'Gustavo', username: 'gugu', address: '', birthDate: 1, contact: '', createdOn: new Date(), familyName: '', profilePhoto: { id: 2, url:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSUbgsM9tnNHMEazj5uMRchc6n5G_ujM9vaBN7m0Kfxd3T7QAj4&usqp=CAU',  type: 'I', description: 'eu'}};
    var user3 = {id: 3, givenName: 'Robson', username: 'rob', address: '', birthDate: 1, contact: '', createdOn: new Date(), familyName: '', profilePhoto: { id: 2, url:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRcCL-1WAQCU623E3mfzm86LmhYcPrlW5A2wbE7K9yURaWW_GxV&usqp=CAU',  type: 'I', description: 'eu'}};
    this.conversations.push({
      id: 1,
      users: [ user, user2],
      messages: [ {content: 'Hi mother foca', sender: user, type: 'CHAT', sentTime: new Date()},
                  {content: 'How you doing, mate? How is your mom? your family? Buy me some broccolliu Blablabla', sender: user2  , type: 'CHAT', sentTime: new Date()},
                  {content: 'How you doing, mate? How is your mom? your family? Buy me some broccolliu Blablabla', sender: user2  , type: 'CHAT', sentTime: new Date()},
                  {content: 'How you doing, mate? How is your mom? your family? Buy me some broccolliu Blablabla', sender: user2  , type: 'CHAT', sentTime: new Date()},
                  {content: 'How you doing, mate? How is your mom? your family? Buy me some broccolliu Blablabla', sender: user2  , type: 'CHAT', sentTime: new Date()},
                  {content: 'Hi mother foca', sender: user, type: 'CHAT', sentTime: new Date()},
                  {content: 'Hi mother foca', sender: user, type: 'CHAT', sentTime: new Date()},
                  {content: 'Hi mother foca', sender: user, type: 'CHAT', sentTime: new Date()},
                  {content: 'Hi mother foca', sender: user, type: 'CHAT', sentTime: new Date()}]
    });
    this.conversations.push({
      id: 2,
      users: [ user, user3],
      messages: [ {content: 'Hi mother foca', sender: user, type: 'CHAT', sentTime: new Date()}, {content: 'How you doing, mate? How is your mom? your family? Buy me some broccolliu Blablabla', sender: user3  , type: 'CHAT', sentTime: new Date()}]
    });
  }

  initializeWebSocketConnection(){
    let ws = new SockJS('http://localhost:8081/taskme');
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      // that.stompClient.subscribe("/topic/public", (payload) => {
      // that.stompClient.subscribe("/topic/chats.1", (payload) => {
      //   var message = JSON.parse(payload.body);
      //   if(message != null) {
      //     that.conversations[0].messages.push(message);
      //     // var messageElement = that.renderer.createElement('li');

      //     // //append text to li element
      //     // that.renderer.appendChild(messageElement, that.renderer.createText(message.content));
      //     // that.renderer.appendChild(that.divMessages.nativeElement,messageElement);
      //   }
      // });
    });
  }

  sendMessage(params){
    //TODO
    //pensar em passar toda essa logica de subscribe pra dentro do messages-container.component
    var chatMessage = {
      sender: params.message.sender.givenName,
      content: params.message.content,
      type: 'CHAT'
    };
    // this.stompClient.send("/topic/public" , {}, JSON.stringify(chatMessage));
    this.stompClient.send("/app/chat.send/" +  params.conversationId, {}, JSON.stringify(chatMessage  ));
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
}
