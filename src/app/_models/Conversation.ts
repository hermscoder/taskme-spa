import { Message } from "./Message";
import { User } from "./User";

export interface Conversation {
  id: number;
  users: User[];
  messages: Message[];
}
