import { UserDTO } from './UserDTO';
import { MessageDTO } from './MessageDTO';
import { TaskSomeoneDetailsDTO } from './TaskSomeoneDetailsDTO';

export interface TaskApplicationForListDTO {
  taskApplicationId: number;
  user: UserDTO;
  createdOn: Date;
  taskApplicationStatus: string;
  applyingMessage: MessageDTO;
  status: string;
}
