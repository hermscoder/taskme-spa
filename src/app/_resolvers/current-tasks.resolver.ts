import { Injectable } from '@angular/core';
import { TaskSomeone } from '../_models/TaskSomeone';
import { TaskSomeoneDetailsDTO } from '../_models/TaskSomeoneDetailsDTO';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TaskSomeoneService } from '../_services/task-someone.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pageable } from '../_models/Pageable';

@Injectable()

export class CurrentTasksResolver implements Resolve<TaskSomeoneDetailsDTO[]> {
  constructor(private taskSomeoneService: TaskSomeoneService,
    private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<TaskSomeoneDetailsDTO[]> {
      var thisRoute = route;
      var pageable = new Pageable();
      pageable.searchTerm = route.params['taskTitle'];
      // catch any errors, if we have problems, we redirect and print a message for the user
      return this.taskSomeoneService.listCurrentUserTasks(pageable).pipe(
        catchError(error => {
          console.log(thisRoute);
          this.alertify.error('Problem retrieving data');
          return of(null);
        })
      );
    }
}
