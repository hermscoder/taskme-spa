import { User } from "./User";

export interface Message {
  sender: User;
  content: string;
  type: string;
  sentTime: Date;
}


