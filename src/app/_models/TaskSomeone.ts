import { UserDTO } from './UserDTO';
import { Media } from './Media';

export interface TaskSomeone {
  id: number;
  user: UserDTO;
  title: string;
  description: string;
  location: string;
  mediaList?: Media[];
  createdOn: Date;
  dueDate: Date;
}
