import { Component, OnInit, Input } from '@angular/core';
import { ConversationDTO } from 'src/app/_models/ConversationDTO';
import { MessageDTO } from 'src/app/_models/MessageDTO';
import { UserDTO } from 'src/app/_models/UserDTO';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-message-list-item',
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.css']
})
export class MessageListItemComponent implements OnInit {
  @Input() message: MessageDTO;
  @Input() listConversationMode: Boolean;
  @Input() userMap: Map<number, UserDTO>;
  @Input() currentUser: User;
  @Input() lastMessageFromSameUser = false;
  @Input() selected = false;

  constructor() { }

  sender: UserDTO;
  contact: UserDTO;

  ngOnInit() {

  }

  getSender(): UserDTO {
  	let sender = this.userMap[this.message.userSenderId];
  	if(sender.id == this.currentUser.id){
  		sender.givenName = 'You';
  	}
  	return sender;
  }

  getContact(): UserDTO{
	  return Object.values(this.userMap).find(user => user.id != this.currentUser.id);
  }

  isMyMsg(message): boolean{
    return this.currentUser.id == message.userSenderId;
  }
}
