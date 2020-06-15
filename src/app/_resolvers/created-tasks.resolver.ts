import { Injectable } from '@angular/core';
import { TaskSomeone } from '../_models/TaskSomeone';
import { TaskSomeoneDetailsDTO } from '../_models/TaskSomeoneDetailsDTO';
import { Pageable } from '../_models/Pageable';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TaskSomeoneService } from '../_services/task-someone.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()

export class CreatedTasksResolver implements Resolve<TaskSomeoneDetailsDTO[]> {
  constructor(private taskSomeoneService: TaskSomeoneService,
    private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<TaskSomeoneDetailsDTO[]> {
      var pageable = new Pageable();
      pageable.searchTerm = route.params['title'];
      return this.taskSomeoneService.listCurrentUserTasks(pageable).pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['findTasks']);
          return of(null);
        })
      );
    }
}
