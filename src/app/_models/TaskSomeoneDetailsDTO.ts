import { UserDTO } from './UserDTO';
import { Media } from './Media';
import { TaskApplicationForListDTO } from './TaskApplicationForListDTO';

export interface TaskSomeoneDetailsDTO {
  id: number;
  user: UserDTO;
  title: string;
  dueDate: Date;
  description: string;
  location: string;
  mediaList?: Media[];
  createdOn: Date;
  ownTask: boolean;
  taskApplicants: TaskApplicationForListDTO[];
  alreadyApplied: boolean;
  participants: UserDTO[];
  state: string;
}
