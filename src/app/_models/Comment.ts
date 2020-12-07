import { User } from "./User";
import { UserDTO } from "./UserDTO";

export class Comment {
    id: number;
    content: string;
    userSender: UserDTO;
    sentTime: Date;
    taskSomeoneId: number;

    static factory(content: string, sentTime: Date, userSender: UserDTO, tasksomeoneId: number): Comment {
        let comment = new Comment();
        comment.content = content;
        comment.sentTime = sentTime;
        comment.userSender = userSender;
        comment.taskSomeoneId = tasksomeoneId;
        return comment;
    };
}
