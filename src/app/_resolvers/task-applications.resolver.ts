import { Injectable } from '@angular/core';
import { TaskSomeone } from '../_models/TaskSomeone';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TaskSomeoneService } from '../_services/task-someone.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pageable } from '../_models/Pageable';

@Injectable()

export class TaskApplicationsResolver implements Resolve<TaskSomeone> {
  constructor(private taskSomeoneService: TaskSomeoneService,
    private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<TaskSomeone> {
      // catch any errors, if we have problems, we redirect and print a message for the user
      return this.taskSomeoneService.listCurrentUserApplications(new Pageable()).pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['taskApplications']);
          return of(null);
        })
      );
    }
}
