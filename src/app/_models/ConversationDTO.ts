import { MessageDTO } from "./MessageDTO";
import { User } from "./User";
import { UserDTO } from "./UserDTO";

export class ConversationDTO {
  id: number;
  userMap: Map<number, UserDTO>;
  messagesList: MessageDTO[];
  hasUnreadMessages: boolean;
  createdOn: Date;
  participants: UserDTO[];

  constructor(participants: UserDTO[], messagesList: MessageDTO[], createdOn: Date) {
    this.participants = participants;
    this.messagesList = messagesList;
    this.createdOn = createdOn;
  };
}
