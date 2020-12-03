import { UserDTO } from './UserDTO';
import { Media } from './Media';
import {TaskState} from './TaskState';

export interface TaskSomeone {
  id: number;
  user: UserDTO;
  title: string;
  description: string;
  location: string;
  mediaList?: Media[];
  createdOn: Date;
  frequency: string;
  startDate: Date;
  endDate: Date;
  state: number;
  isSubTask: boolean;
}
