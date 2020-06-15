import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskApplicationDetailsDTO } from '../../_models/TaskApplicationDetailsDTO';
import { TaskApplicationService } from '../../_services/task-application.service';
import { AlertifyService } from '../../_services/alertify.service';


@Component({
	selector: 'app-task-application-card',
	templateUrl: './task-application-card.component.html',
	styleUrls: ['./task-application-card.component.css']
})
export class TaskApplicationCardComponent implements OnInit {
	@Input() taskApplication: TaskApplicationDetailsDTO;
	@Input() applicationClass: string;

	cardClass = '';
	inputContantsFilter = '';
	constructor(private taskApplicationService: TaskApplicationService, private alertify: AlertifyService) { }

	ngOnInit() {
	}

	cancelTaskApplication(){
		this.taskApplicationService.cancelTaskApplication(this.taskApplication).subscribe((result: TaskApplicationDetailsDTO) => {
	      this.taskApplication = result;
	    }, error => {
	      this.alertify.error(error.message);
	    });
	}

	getCardClass(status){
		return this.taskApplicationService.getClassFromStatus(status);
	}
	getColorClass(status){
		if(['ACCEPTED', 'DECLINED', 'CANCELLED_BY_APPLICANT', 'TASK_CLOSED'].indexOf(status) > -1) {
			return 'light-';
		} else{
			return '';
		}
	}

	isCancellable(status){
		return ['PENDING', 'ACCEPTED'].indexOf(status) > -1;
	}
}
