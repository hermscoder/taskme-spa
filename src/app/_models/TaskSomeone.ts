import { User } from './User';
import { Media } from './Media';

export interface TaskSomeone {
  id: number;
  user: User;
  title: string;
  description: string;
  local: string;
  mediaList?: Media[];
  createdOn: Date;
}
