import { Injectable } from '@angular/core';
import { TaskSomeone } from '../_models/TaskSomeone';
import { TaskSomeoneDetailsDTO } from '../_models/TaskSomeoneDetailsDTO';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { TaskSomeoneService } from '../_services/task-someone.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pageable } from '../_models/Pageable';
import { DateUtils } from '../_utils/DateUtils';

@Injectable()

export class TaskAgendaResolver implements Resolve<TaskSomeoneDetailsDTO[]> {
	constructor(private taskSomeoneService: TaskSomeoneService,
		private router: Router, private alertify: AlertifyService) { }

	resolve(route: ActivatedRouteSnapshot): Observable<TaskSomeoneDetailsDTO[]> {
		var thisRoute = route;
		var pageable = new Pageable();
		pageable.searchTerm = route.params['taskTitle'];
		pageable.adicionalFilters = new Map();
		pageable.adicionalFilters.set('periodicTasks', true);
		let today = new Date();
		pageable.adicionalFilters.set('fromDate', DateUtils.convertDateToRequestParamString(today));
		pageable.adicionalFilters.set('toDate', DateUtils.convertDateToRequestParamString(DateUtils.addDays(today, 7)));

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
