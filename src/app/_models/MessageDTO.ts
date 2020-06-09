import { User } from "./User";

export class MessageDTO {
  content: string;
  userSenderId: number;
  sentTime: Date;
  conversationId: number;

  // variables used for better message display
  lastMessageFromSameUser: boolean;

  contructor(content: string, sentTime: Date){
  	this.content = content;
  	this.sentTime = sentTime;
  };
}


