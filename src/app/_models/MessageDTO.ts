import { User } from "./User";

export interface MessageDTO {
  content: string;
  userSenderId: number;
  sentTime: Date;
  conversationId: number;
}


