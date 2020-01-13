import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TaskSomeone } from '../_models/TaskSomeone';
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

  listCurrentUserTasks(): Observable<TaskSomeone[]> {
    return this.http.get<TaskSomeone[]>(this.baseUrl + '/tasksomeone/createdTasks');
  }

  getTask(id): Observable<TaskSomeone> {
    return this.http.get<TaskSomeone>(this.baseUrl + '/tasksomeone/' + id);
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
}
