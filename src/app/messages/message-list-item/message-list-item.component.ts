import { Component, OnInit, Input } from '@angular/core';
import { Conversation } from 'src/app/_models/Conversation';
import { Message } from 'src/app/_models/Message';

@Component({
  selector: 'app-message-list-item',
  templateUrl: './message-list-item.component.html',
  styleUrls: ['./message-list-item.component.css']
})
export class MessageListItemComponent implements OnInit {
  @Input() message: Message;
  @Input() lastMessageMode: Boolean;

  constructor() { }

  ngOnInit() {
  }

}
