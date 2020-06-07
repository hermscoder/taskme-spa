import { Component, OnInit, Input } from '@angular/core';
import { ConversationDTO } from 'src/app/_models/ConversationDTO';
import { MessageDTO } from 'src/app/_models/MessageDTO';
import { UserDTO } from 'src/app/_models/UserDTO';

@Component({
  selector: 'app-message-list-item',
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.css']
})
export class MessageListItemComponent implements OnInit {
  @Input() message: MessageDTO;
  @Input() sender: UserDTO;
  @Input() lastMessageMode: Boolean;

  constructor() { }

  ngOnInit() {
  }

}
