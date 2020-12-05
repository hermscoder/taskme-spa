import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { Pageable } from 'src/app/_models/Pageable';
import { PaginationInfo } from 'src/app/_models/PaginationInfo';
import { TaskSomeoneDetailsDTO } from 'src/app/_models/TaskSomeoneDetailsDTO';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { TaskSomeoneService } from 'src/app/_services/task-someone.service';
import { DateUtils } from 'src/app/_utils/DateUtils';

@Component({
	selector: 'app-task-agenda',
	templateUrl: './task-agenda.component.html',
	styleUrls: ['./task-agenda.component.css']
})
export class TaskAgendaComponent implements OnInit {

	periodicTasks: TaskSomeoneDetailsDTO[];

	constructor(private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService, private route: ActivatedRoute) {
	}

	paginationInfo: PaginationInfo;
	bsConfig:  Partial<BsDatepickerConfig>;
	toDateFilter: Date;
	fromDateFilter: Date;

	ngOnInit() {
		let today = new Date();
		this.fromDateFilter = today;
		this.toDateFilter = DateUtils.addDays(today, 7);
		this.bsConfig = {
			containerClass: 'theme-blue',
			dateInputFormat: 'DD/MM/YYYY'
		};

		this.route.data.subscribe(data => {
			this.periodicTasks = data['periodicTasksList'].content;
			this.paginationInfo = new PaginationInfo(data['periodicTasksList']);
		});
	}

	listWithPagination(pageable: Pageable) {
		this.fillAdditionalFilters(pageable);
		this.taskSomeoneService.listCurrentUserTasks(pageable).subscribe((page: any[]) => {
			this.periodicTasks = page['content'];
			this.paginationInfo = new PaginationInfo(page);
		}, error => {
			this.alertify.error(error.message);
		});
	}

	fillAdditionalFilters(pageable: Pageable) {
		// pageable.searchTerm = route.params['taskTitle'];
		pageable.adicionalFilters = new Map();
		pageable.adicionalFilters.set('periodicTasks', true);
		pageable.adicionalFilters.set('fromDate', DateUtils.convertDateToRequestParamString(this.fromDateFilter));
		pageable.adicionalFilters.set('toDate', DateUtils.convertDateToRequestParamString(this.toDateFilter));

	}

}
