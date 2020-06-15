import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Pageable } from '../_models/Pageable';
import { TaskSomeoneDetailsDTO } from '../_models/TaskSomeoneDetailsDTO';
import { TaskApplicationDetailsDTO } from '../_models/TaskApplicationDetailsDTO';
import { UserDTO } from '../_models/UserDTO';
import { MessageDTO } from '../_models/MessageDTO';
import { MsgAndNewApplicationStatus } from '../_models/MsgAndNewApplicationStatus';


@Injectable({
  providedIn: 'root'
})
export class TaskApplicationService {

  baseUrl = environment.apiUrl + 'logged';

  constructor(private http: HttpClient) { }

  listCurrentUserApplications(pageable: Pageable): Observable<TaskApplicationDetailsDTO[]> {
    console.log(this.baseUrl + '/taskapplication/applications?' + (pageable ? pageable.buildRequestParamString() : ''));
    return this.http.get<TaskApplicationDetailsDTO[]>(this.baseUrl + '/taskapplication/?' + (pageable ? pageable.buildRequestParamString() : ''));
  }

  listTaskApplicants(pageable: Pageable, taskSomeoneId: number): Observable<UserDTO[]> {
    console.log(this.baseUrl + '/taskapplication/' + taskSomeoneId + '/applicants?' + (pageable ? pageable.buildRequestParamString() : ''));
    return this.http.get<UserDTO[]>(this.baseUrl + '/taskapplication/' + taskSomeoneId + '/applicants?' + (pageable ? pageable.buildRequestParamString() : ''));
  }

  sendApplyMessageToTaskOwner(messageTxt, taskSomeoneId){
    var message = new MessageDTO();
    message.content = messageTxt;
    return this.http.post(this.baseUrl + '/taskapplication/sendApplyingMsg/' + taskSomeoneId, message);
  }

  cancelTaskApplication(taskApplicationDTO:TaskApplicationDetailsDTO): Observable<TaskApplicationDetailsDTO> {
    console.log(this.baseUrl + '/taskapplication/cancel');
    return this.http.post<TaskApplicationDetailsDTO>(this.baseUrl + '/taskapplication/cancel', taskApplicationDTO);
  }

  changeTaskApplicationStatus(messageTxt:string, newStatus: string, taskApplicationId:number): Observable<TaskApplicationDetailsDTO> {
    var message = new MessageDTO();
    message.content = messageTxt;
    console.log(this.baseUrl + '/taskapplication/changeStatusAndSendMsgToApplicant');
    return this.http.post<TaskApplicationDetailsDTO>(this.baseUrl + '/taskapplication/changeStatusAndSendMsgToApplicant', new MsgAndNewApplicationStatus(message, newStatus, taskApplicationId));
  }

  getClassFromStatus(status: string){
    if(status == 'PENDING') {
      return 'bg-light';
    }
    if(status == 'ACCEPTED') {
      return 'text-white bg-primary';
    }
    if(status == 'DECLINED') {
      return 'bg-secondary';
    }
    if(status == 'CANCELLED_BY_APPLICANT') {
      return 'text-white bg-danger';
    }
    if(status == 'TASK_CLOSED') {
      return 'text-white bg-dark';
    }
  }
}
