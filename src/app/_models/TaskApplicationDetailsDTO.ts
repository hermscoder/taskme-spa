import { UserDTO } from './UserDTO';
import { TaskSomeoneDetailsDTO } from './TaskSomeoneDetailsDTO';

export interface TaskApplicationDetailsDTO {
  id: number;
  user: UserDTO;
  task: TaskSomeoneDetailsDTO;
  createdOn: Date;
  status: string;
}
