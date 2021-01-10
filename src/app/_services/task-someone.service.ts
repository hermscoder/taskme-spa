import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {TaskSomeone} from '../_models/TaskSomeone';
import {TaskSomeoneDetailsDTO} from '../_models/TaskSomeoneDetailsDTO';
import {TaskSomeoneForListDTO} from '../_models/TaskSomeoneForListDTO';
import {UserDTO} from '../_models/UserDTO';
import {Media} from '../_models/Media';
import {GPaginator} from '../_interfaces/GPaginator';
import {Pageable} from '../_models/Pageable';
import {TaskState} from '../_models/TaskState';
import {ChangeStateDTO} from '../_models/ChangeStateDTO';
import {FrequencyEnum} from '../_models/FrequencyEnum';
import { DateUtils } from '../_utils/DateUtils';

@Injectable({
    providedIn: 'root'
})
export class TaskSomeoneService implements GPaginator {

    baseUrl = environment.apiUrl + 'logged';

    constructor(private http: HttpClient) {
    }

    listWithPagination(pageable: Pageable): Observable<any[]> {
        return this.http.get<TaskSomeone[]>(this.baseUrl + '/tasksomeona?' + (pageable ? pageable.buildRequestParamString() : ''));
    }

    listTasks(): Observable<TaskSomeone[]> {
        return this.http.get<TaskSomeone[]>(this.baseUrl + '/listtasks');
    }

    listCurrentUserCreatedTasks(pageable: Pageable): Observable<TaskSomeoneDetailsDTO[]> {
        console.log(this.baseUrl + '/tasksomeone/createdTasks?' + (pageable ? pageable.buildRequestParamString() : ''));
        return this.http.get<TaskSomeoneDetailsDTO[]>(this.baseUrl + '/tasksomeone/createdTasks?'
            + (pageable ? pageable.buildRequestParamString() : ''));
    }

    getTask(id): Observable<TaskSomeoneDetailsDTO> {
        return this.http.get<TaskSomeoneDetailsDTO>(this.baseUrl + '/tasksomeone/' + id);
    }

    createTaskSomeone(model: any) {
        return this.http.post(this.baseUrl + '/tasksomeone', model);
    }

    updateTaskSomeone(model: any) {
        return this.http.post(this.baseUrl + '/tasksomeone/' + model.id, model);
    }

    removeMediaFromTaskSomeone(mediaIdList: Array<number>, tasksomeoneId: any) {
        return this.http.delete(this.baseUrl + '/tasksomeone/' + tasksomeoneId + '/removeMedias/' + mediaIdList.join(','));
    }

    findPreviousTasksFromUser(userId: number): Observable<TaskSomeoneForListDTO[]> {
        return this.http.get<TaskSomeoneForListDTO[]>(this.baseUrl + '/tasksomeone/previousTasks/' + userId);
    }

    terminateApplications(model: any) {
        return this.http.post(this.baseUrl + '/tasksomeone/terminateApplications', model);
    }

    openApplications(model: any) {
        return this.http.post(this.baseUrl + '/tasksomeone/openApplications', model);
    }

    listCurrentUserTasks(pageable: Pageable): Observable<TaskSomeoneDetailsDTO[]> {
        return this.http.get<TaskSomeoneDetailsDTO[]>(this.baseUrl + '/tasksomeone/currentTasks?' + (pageable ? pageable.buildRequestParamString() : ''));
    }

    changeTaskToNextState(taskId: number): Observable<TaskSomeoneDetailsDTO[]> {
        return this.http.post<TaskSomeoneDetailsDTO[]>(this.baseUrl + '/tasksomeone/' + taskId + '/changeState', new ChangeStateDTO('nextState'));
    }

    changeTaskToPreviousState(taskId: number): Observable<TaskSomeoneDetailsDTO[]> {
        return this.http.post<TaskSomeoneDetailsDTO[]>(this.baseUrl + '/tasksomeone/' + taskId + '/changeState', new ChangeStateDTO('previousState'));
    }

    changeTaskToCancelled(taskId: number): Observable<TaskSomeoneDetailsDTO[]> {
        return this.http.post<TaskSomeoneDetailsDTO[]>(this.baseUrl + '/tasksomeone/' + taskId + '/changeState', new ChangeStateDTO('cancelState'));
    }

    isOpenForApplications(taskSomeone: any): boolean {
        return taskSomeone.state === TaskState.APPLICATIONS_OPEN;
    }

    isClosedForApplications(taskSomeone: any) {
        return taskSomeone.state === TaskState.APPLICATIONS_CLOSED;
    }

    isCancelled(taskSomeone: any) {
        return taskSomeone.state === TaskState.CANCELLED;
    }

    getCurrentStateDescription(stateCode: number) {
        if (stateCode === TaskState.CREATED) {
            return 'Created';
        } else if (stateCode === TaskState.APPLICATIONS_OPEN) {
            return 'Applications Open';
        } else if (stateCode === TaskState.APPLICATIONS_CLOSED) {
            return 'Applications Closed';
        } else if (stateCode === TaskState.STARTED) {
            return 'In Progress';
        } else if (stateCode === TaskState.DONE) {
            return 'Done';
        } else if (stateCode === TaskState.CANCELLED) {
            return 'Cancelled';
        }
    }

    getStateOptionDescription(stateCode: number, taskSomeone: any = null) {
        if (stateCode === TaskState.CREATED) {
            return 'Created';
        } else if (stateCode === TaskState.APPLICATIONS_OPEN) {
            return 'Open for Applications';
        } else if (stateCode === TaskState.APPLICATIONS_CLOSED) {
            if(taskSomeone && taskSomeone.state > stateCode) {
                return 'Applications Closed';
            } else {
                return 'Close Applications';
            }
        } else if (stateCode === TaskState.STARTED) {
            return 'Start';
        } else if (stateCode === TaskState.DONE) {
            return 'Done';
        } else if (stateCode === TaskState.CANCELLED) {
            return 'Cancel';
        }
    }

    getStateClass(stateCode: number, outline: boolean = false) {
        let returnClass = (outline ? 'outline-' : '');
        if (stateCode === TaskState.CREATED) {
            returnClass += 'dark';
        } else if (stateCode === TaskState.APPLICATIONS_OPEN) {
            returnClass += 'warning';
        } else if (stateCode === TaskState.APPLICATIONS_CLOSED) {
            returnClass += 'warning';
        } else if (stateCode === TaskState.STARTED) {
            returnClass += 'info';
        } else if (stateCode === TaskState.DONE) {
            returnClass += 'success';
        } else if (stateCode === TaskState.CANCELLED) {
            returnClass += 'danger';
        }
        if (returnClass === 'outline-') {
            returnClass = '';
        }

        return returnClass;
    }

    getStateIconClass(stateCode: number) {
        let returnIconClass = '';
        if (stateCode === TaskState.CREATED) {
            returnIconClass += 'fa fa-pencil';
        } else if (stateCode === TaskState.APPLICATIONS_OPEN) {
            returnIconClass += 'fa fa-user-plus';
        } else if (stateCode === TaskState.APPLICATIONS_CLOSED) {
            returnIconClass += 'fa fa-users';
        } else if (stateCode === TaskState.STARTED) {
            returnIconClass += 'fa fa-play';
        } else if (stateCode === TaskState.DONE) {
            returnIconClass += 'fa fa-check';
        } else if (stateCode === TaskState.CANCELLED) {
            returnIconClass += 'fa fa-ban';
        }
        return returnIconClass;
    }

    isPeriodic(taskSomeone: any): boolean {
        if (taskSomeone.frequency == null || taskSomeone.frequency === '') {
            return false;
        }
        return true;
    }

    getPunctualTaskRisk(task: TaskSomeoneDetailsDTO) {
        let startDate = DateUtils.convertStringToDate(task.startDate);
        let endDate = DateUtils.convertStringToDate(task.endDate);

        if (!task.endDate) {
            return 'none';
        }

        let totalDaysOfTheTask = DateUtils.datediffInDays(endDate, startDate);
        let daysLeftTillDeadLine = DateUtils.datediffInDays(new Date(), endDate, false);

        let outdated = daysLeftTillDeadLine < 0;
        if(outdated) {
            return 'outdated'
        }

        let daysLeftPercentual = (daysLeftTillDeadLine * 100)/totalDaysOfTheTask;
        
        if (daysLeftPercentual < 10) {
            return 'danger';
        } else if (daysLeftPercentual < 30) {
            return 'attention';
        } else if (daysLeftPercentual < 50) {
            return 'some';
        } else {
            return 'none';
        }
    }
}
