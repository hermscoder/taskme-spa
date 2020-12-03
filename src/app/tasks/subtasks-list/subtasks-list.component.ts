import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { TaskSomeoneDetailsDTO } from 'src/app/_models/TaskSomeoneDetailsDTO';
import { TaskState } from 'src/app/_models/TaskState';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { TaskSomeoneService } from 'src/app/_services/task-someone.service';
import { DateUtils } from 'src/app/_utils/DateUtils';

@Component({
	selector: 'app-subtasks-list',
	templateUrl: './subtasks-list.component.html',
	styleUrls: ['./subtasks-list.component.css']
})
export class SubtasksListComponent implements OnInit {

	@Input() taskSomeone: TaskSomeoneDetailsDTO;
	@Output() onCloseModal = new EventEmitter<any>();

	inputFirstDateFilter: Date;
	inputSecondDateFilter: Date;
	bsConfig:  Partial<BsDatepickerConfig>;

	

	constructor(private modalService: NgbModal, private alertify: AlertifyService, private taskSomeoneService: TaskSomeoneService) {
	}
	
	ngOnInit() {
		this.bsConfig = {
			containerClass: 'theme-blue',
			dateInputFormat: 'DD/MM/YYYY'
		  };
		  this.initializeDateInputs();
	}

	initializeDateInputs() {
		this.inputFirstDateFilter = DateUtils.convertStringToDate(this.taskSomeone.subTasks[0].endDate);
		this.inputSecondDateFilter = DateUtils.convertStringToDate(this.taskSomeone.subTasks[this.taskSomeone.subTasks.length - 1].endDate);
	}

    closeModal() {
        this.onCloseModal.emit(this.taskSomeone);
	}
	
	onTaskUpdatedSuccessfully(res: any) {
		let index = this.taskSomeone.subTasks.indexOf(this.taskSomeone.subTasks.find(x => x.id === res.id));
		// changing the value of the edited subtask to the new one after editing.
		if(index != -1){
			this.taskSomeone.subTasks[index] = res;
		}
	}
	
	open(content) {
 		this.modalService.open(content, {
			 size: 'lg', 
			 ariaLabelledBy: 'modal-basic-title',
			 backdrop: 'static',
			 keyboard: false
			});
        
	}
	
	
}
