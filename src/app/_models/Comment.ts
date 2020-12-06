import { User } from "./User";
import { UserDTO } from "./UserDTO";

export class Comment {
  content: string;
  userSender: UserDTO;
  sentTime: Date;

  contructor(content: string, sentTime: Date, userSender: UserDTO) {
  	this.content = content;
  	this.sentTime = sentTime;
  };
}
