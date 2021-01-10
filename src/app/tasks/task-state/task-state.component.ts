import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskSomeone } from 'src/app/_models/TaskSomeone';
import { TaskSomeoneDetailsDTO } from 'src/app/_models/TaskSomeoneDetailsDTO';
import { TaskState } from 'src/app/_models/TaskState';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { TaskSomeoneService } from 'src/app/_services/task-someone.service';

@Component({
	selector: 'app-task-state',
	templateUrl: './task-state.component.html',
	styleUrls: ['./task-state.component.css']
})
export class TaskStateComponent implements OnInit {

	cancelledState = TaskState.CANCELLED;
	@Input() taskSomeone: TaskSomeone;
	@Input() isOnlyDisplaying: boolean = false;
	@Input() styleClasses: string = 'ml-3';

	@Output() taskUpdated = new EventEmitter<any>();
	
	constructor(private modalService: NgbModal, private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService) {
	}
	ngOnInit() {
	}

	getCurrentStateDescription(stateCode: number) {
        return this.taskSomeoneService.getCurrentStateDescription(stateCode);
    }

    getStateOptionDescription(stateCode: number, taskSomeone: any) {
        return this.taskSomeoneService.getStateOptionDescription(stateCode, taskSomeone);
	}
	
	changeTaskToNextStatus(taskSomeone: any) {
		let msg;
		if (taskSomeone.isSubTask === false) {
			if (taskSomeone.state == TaskState.APPLICATIONS_OPEN) {
				msg = 'Are you sure that do you want to close the applications for this task?';
			} else if (taskSomeone.state == TaskState.CREATED) {
				msg = 'Are you sure that do you want to open the applications for this task?';
			} else if (taskSomeone.state == TaskState.APPLICATIONS_CLOSED) {
				msg = 'Confirm task start? ' +
					'<b>A message will automatically be sent to all ' +
					'the task participants</b>, warning them that the task has started.';

				if (taskSomeone.frequency != null) {
					msg += '<br> And <b>subtasks will be created</b> as well, accordinly to the specified task frequency.'
				}
			}
		}

		const that = this;
		if (msg) {
			this.alertify.confirmation('Confirmation', msg, () => {
				that.taskSomeoneService.changeTaskToNextState(taskSomeone.id).subscribe((tasksomeoneRes: any) => {
					that.taskSomeone = tasksomeoneRes;
					this.taskUpdated.emit(tasksomeoneRes);
				}, error => {
					that.alertify.error(error.message);
				})
			});
		} else {
			this.taskSomeoneService.changeTaskToNextState(taskSomeone.id).subscribe((tasksomeoneRes: any) => {
				that.taskSomeone = tasksomeoneRes;
				this.taskUpdated.emit(tasksomeoneRes);
			}, error => {
				that.alertify.error(error.message);
			})
		}

	}

	changeTaskToPreviousState(taskSomeone: any) {
		this.taskSomeoneService.changeTaskToPreviousState(taskSomeone.id).subscribe((tasksomeoneRes: any) => {
			this.taskSomeone = tasksomeoneRes;
			this.taskUpdated.emit(tasksomeoneRes);
		}, error => {
			this.alertify.error(error.message);
		});
	}

	changeTaskToCancelled(taskSomeone: any) {
		const that = this;

		this.alertify.confirmation('Confirmation', 'Are you sure that do you want to CANCEL this task? This can\'t be undone!', () => {
			that.taskSomeoneService.changeTaskToCancelled(taskSomeone.id).subscribe((tasksomeoneRes: any) => {
				that.taskSomeone = tasksomeoneRes;
				this.taskUpdated.emit(tasksomeoneRes);
			}, error => {
				that.alertify.error(error.message);
			})
		});
	}

	isCancelled(taskSomeone: any) {
		return this.taskSomeoneService.isCancelled(taskSomeone);
	}

	getStateClass(stateCode: number, outline: boolean = false) {
        return this.taskSomeoneService.getStateClass(stateCode, outline);
    }

    getStateIconClass(stateCode: number) {
        return this.taskSomeoneService.getStateIconClass(stateCode);
	}
	
	canCancel(stateCode: number) {
		return stateCode >= TaskState.CREATED && stateCode < TaskState.DONE;
	}
}
