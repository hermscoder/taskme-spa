import { UserDTO } from './UserDTO';
import { MessageDTO } from './MessageDTO';
import { TaskSomeoneDetailsDTO } from './TaskSomeoneDetailsDTO';

export class MsgAndNewApplicationStatus {
  taskApplicationId: number;
  newStatusCode: string;
  updateStatusMsg: MessageDTO;
  constructor(updateStatusMsg:MessageDTO, newStatus: string, taskApplicationId:number){
  	this.updateStatusMsg = updateStatusMsg;
  	this.newStatusCode = newStatus;
  	this.taskApplicationId = taskApplicationId;
  }
}
