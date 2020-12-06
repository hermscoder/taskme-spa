import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

	constructor(private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService, private route: ActivatedRoute, private modalService: NgbModal) {
	}

	paginationInfo: PaginationInfo;
	bsConfig:  Partial<BsDatepickerConfig>;
	toDateFilter: Date;
	fromDateFilter: Date;
	diffBtwDatesInDays: number;
	agendaMap: Map<Date, TaskSomeoneDetailsDTO[]>;
	dateArr: Date[];
	selectedSubTask: TaskSomeoneDetailsDTO;

	ngOnInit() {
		this.agendaMap = new Map();
		this.dateArr = [];
		this.selectedSubTask = null;

		let today = new Date();
		this.fromDateFilter = today;
		this.toDateFilter = DateUtils.addDays(today, 7);
		this.bsConfig = {
			containerClass: 'theme-blue',
			dateInputFormat: 'DD/MM/YYYY'
		};

		this.route.data.subscribe(data => {
			this.periodicTasks = data['periodicTasksList'].content;
			this.fillAgendaMap(this.periodicTasks);
			this.paginationInfo = new PaginationInfo(data['periodicTasksList']);
		});
		this.onChangeDate(undefined);
	}

	listWithPagination(pageable: Pageable) {
		this.fillAdditionalFilters(pageable);
		this.taskSomeoneService.listCurrentUserTasks(pageable).subscribe((page: any[]) => {
			this.periodicTasks = page['content'];
			this.fillAgendaMap(this.periodicTasks);
			this.paginationInfo = new PaginationInfo(page);
		}, error => {
			this.alertify.error(error.message);
		});
	}

	fillAgendaMap(periodicTasks: TaskSomeoneDetailsDTO[]){
		this.agendaMap.clear();
		this.dateArr = [];
		for(let task of periodicTasks) {
			// let endDate = DateUtils.convertStringToDate(task.endDate);
			let endDate = task.endDate;
			let dateListFoundInMap = this.agendaMap.get(endDate);
			if(dateListFoundInMap) {
				dateListFoundInMap.push(task);
			} else {
				this.dateArr.push(endDate);
				this.agendaMap.set(endDate, [task]);
			}
		}
	}

	fillAdditionalFilters(pageable: Pageable) {
		// pageable.searchTerm = route.params['taskTitle'];
		pageable.adicionalFilters = new Map();
		pageable.adicionalFilters.set('periodicTasks', true);
		pageable.adicionalFilters.set('fromDate', DateUtils.convertDateToRequestParamString(this.fromDateFilter));
		pageable.adicionalFilters.set('toDate', DateUtils.convertDateToRequestParamString(this.toDateFilter));
	}

	getStateClass(taskSomeone: TaskSomeoneDetailsDTO): string {
		return this.taskSomeoneService.getStateClass(taskSomeone.state);
	}

	onChangeDate(event) {
		this.diffBtwDatesInDays = DateUtils.datediffInDays(this.fromDateFilter, this.toDateFilter);
		this.listWithPagination(new Pageable());
	}

	changeDatesToNextDatesPeriod(){
		this.fromDateFilter = DateUtils.addDays(this.fromDateFilter, this.diffBtwDatesInDays);	
		this.toDateFilter = DateUtils.addDays(this.toDateFilter, this.diffBtwDatesInDays);	
		this.listWithPagination(new Pageable());
	}

	changeDatesToPreviousDatesPeriod(){
		this.fromDateFilter = DateUtils.addDays(this.fromDateFilter, (this.diffBtwDatesInDays*(-1)));
		this.toDateFilter = DateUtils.addDays(this.toDateFilter, (this.diffBtwDatesInDays*(-1)));
		this.listWithPagination(new Pageable());
	}

	getDateSubTasks(date: Date){
		return this.agendaMap.get(date);
	}

	open(content, task: TaskSomeoneDetailsDTO) {
		this.selectedSubTask = task;
		this.modalService.open(content, {
			size: 'lg',
			windowClass: 'subTaskDetailsModal',
			ariaLabelledBy: 'modal-basic-title',
			backdrop: 'static',
			keyboard: true
		});
        
    }
}
