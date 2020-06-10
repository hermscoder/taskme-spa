import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Pageable } from '../_models/Pageable';
import { TaskSomeoneDetailsDTO } from '../_models/TaskSomeoneDetailsDTO';
import { TaskApplicationDetailsDTO } from '../_models/TaskApplicationDetailsDTO';
import { UserDTO } from '../_models/UserDTO';
import { MessageDTO } from '../_models/MessageDTO';

@Injectable({
  providedIn: 'root'
})
export class TaskApplicationService {

  baseUrl = environment.apiUrl + 'logged';

  constructor(private http: HttpClient) { }

  listCurrentUserApplications(pageable: Pageable): Observable<TaskSomeoneDetailsDTO[]> {
    console.log(this.baseUrl + '/taskapplication/applications?' + (pageable ? pageable.buildRequestParamString() : ''));
    return this.http.get<TaskSomeoneDetailsDTO[]>(this.baseUrl + '/taskapplication/applications?' + (pageable ? pageable.buildRequestParamString() : ''));
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
}
