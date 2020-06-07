import { MessageDTO } from "./MessageDTO";
import { User } from "./User";
import { UserDTO } from "./UserDTO";

export interface ConversationDTO {
  id: number;
  userMap: Map<number, UserDTO>;
  messagesList: MessageDTO[];
  hasUnreadMessages: boolean;
  createdOn: Date;
}
