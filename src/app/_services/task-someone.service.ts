import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TaskSomeone } from '../_models/TaskSomeone';
import { TaskSomeoneDetailsDTO } from '../_models/TaskSomeoneDetailsDTO';
import { TaskSomeoneForListDTO } from '../_models/TaskSomeoneForListDTO';
import { UserDTO } from '../_models/UserDTO';
import { Media } from '../_models/Media';
import { GPaginator } from '../_interfaces/GPaginator';
import { Pageable } from '../_models/Pageable';

@Injectable({
  providedIn: 'root'
})
export class TaskSomeoneService implements GPaginator {

  baseUrl = environment.apiUrl + 'logged';

  constructor(private http: HttpClient) { }

  listWithPagination(pageable: Pageable): Observable<any[]> {
    return this.http.get<TaskSomeone[]>(this.baseUrl + '/tasksomeona?' + (pageable ? pageable.buildRequestParamString() : '') );
  }

  listTasks(): Observable<TaskSomeone[]> {
    return this.http.get<TaskSomeone[]>(this.baseUrl + '/listtasks');
  }

  listCurrentUserTasks(pageable: Pageable): Observable<TaskSomeoneDetailsDTO[]> {
    console.log(this.baseUrl + '/tasksomeone/createdTasks?' + (pageable ? pageable.buildRequestParamString() : ''));
    return this.http.get<TaskSomeoneDetailsDTO[]>(this.baseUrl + '/tasksomeone/createdTasks?' + (pageable ? pageable.buildRequestParamString() : ''));
  }

  getTask(id): Observable<TaskSomeoneDetailsDTO> {
    return this.http.get<TaskSomeoneDetailsDTO>(this.baseUrl + '/tasksomeone/' + id);
  }

  createTaskSomeone(model: any) {
    return this.http.post(this.baseUrl + '/tasksomeone', model);
  }

  updateTaskSomeone(model: any) {
    return this.http.put(this.baseUrl + '/tasksomeone/' + model.id, model);
  }

  removeMediaFromTaskSomeone(mediaIdList: Array<number>, tasksomeoneId: any) {
    return this.http.delete(this.baseUrl + '/tasksomeone/' + tasksomeoneId + '/removeMedias/' + mediaIdList.join(','));
  }

  findPreviousTasksFromUser(userId:number): Observable<TaskSomeoneForListDTO[]> {
    return this.http.get<TaskSomeoneForListDTO[]>(this.baseUrl + '/tasksomeone/previousTasks/' + userId);
  }
}
