import { UserDTO } from './UserDTO';
import { Media } from './Media';

export interface TaskSomeoneDetailsDTO {
  id: number;
  user: UserDTO;
  title: string;
  description: string;
  location: string;
  mediaList?: Media[];
  createdOn: Date;
  ownTask: boolean;
}
