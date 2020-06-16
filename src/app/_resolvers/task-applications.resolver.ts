import { Injectable } from '@angular/core';
import { TaskSomeone } from '../_models/TaskSomeone';
import { TaskApplicationDetailsDTO } from '../_models/TaskApplicationDetailsDTO';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TaskApplicationService } from '../_services/task-application.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pageable } from '../_models/Pageable';

@Injectable()

export class TaskApplicationsResolver implements Resolve<TaskApplicationDetailsDTO[]> {
  constructor(private taskApplicationService: TaskApplicationService,
    private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<TaskApplicationDetailsDTO[]> {
      var thisRoute = route;
      var pageable = new Pageable();
      pageable.searchTerm = route.params['taskTitle'];
      // catch any errors, if we have problems, we redirect and print a message for the user
      return this.taskApplicationService.listCurrentUserApplications(pageable).pipe(
        catchError(error => {
          console.log(thisRoute);
          this.alertify.error('Problem retrieving data');
          return of(null);
        })
      );
    }
}
