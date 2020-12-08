import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TaskSomeone} from '../../_models/TaskSomeone';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {TaskState} from '../../_models/TaskState';
import {TaskSomeoneDetailsDTO} from '../../_models/TaskSomeoneDetailsDTO';
import {TaskApplicationService} from '../../_services/task-application.service';
import {TaskSomeoneService} from '../../_services/task-someone.service';
import {PaginationInfo} from '../../_models/PaginationInfo';
import {AlertifyService} from '../../_services/alertify.service';
import {Observable} from 'rxjs';
import {ChangeStateDTO} from '../../_models/ChangeStateDTO';

@Component({
    selector: 'app-task-someone-card',
    templateUrl: './task-someone-card.component.html',
    styleUrls: ['./task-someone-card.component.css']
})
export class TaskSomeoneCardComponent implements OnInit {

    cancelledState = TaskState.CANCELLED;
    @Input() taskSomeone: TaskSomeone;
    @Input() editMode: boolean;

    @Output() taskUpdated = new EventEmitter<any>();

    constructor(private modalService: NgbModal, private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService) {
    }

    ngOnInit() {
    }

    open(content, modalName) {
        if (modalName == 'editTaskModal') {
            this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false});
        } else if (modalName == 'taskApplicationsModal') {
            this.modalService.open(content, {
                size: 'lg',
                windowClass: 'taskApplicationsModal',
                ariaLabelledBy: 'modal-basic-title',
                backdrop: 'static',
                keyboard: true
            });
        } else if(modalName == 'rateParticipantsModal'){
            this.modalService.open(content, {
                size: 'sm',
                windowClass: 'rateParticipantsModal',
                ariaLabelledBy: 'modal-basic-title',
                backdrop: 'static'
            });
         } else {
            this.modalService.open(content, {
                size: 'lg',
                ariaLabelledBy: 'modal-basic-title',
                backdrop: 'static',
                keyboard: true
            });
        }
    }

    onTaskUpdatedSuccessfully(res: any) {
        this.taskUpdated.emit(res);
    }

    updateTaskSomeone(taskSomeoneUpdated: any) {
        if (taskSomeoneUpdated != null) {
            this.taskSomeone = taskSomeoneUpdated;
        }
    }

    isOpenForApplications(taskSomeone: any): boolean {
        return this.taskSomeoneService.isOpenForApplications(taskSomeone);
    }

    isClosedForApplications(taskSomeone: TaskSomeoneDetailsDTO) {
        return this.taskSomeoneService.isClosedForApplications(taskSomeone);
    }

    isCancelled(taskSomeone: TaskSomeoneDetailsDTO) {
        return this.taskSomeoneService.isCancelled(taskSomeone);
    }


    getCurrentStateDescription(stateCode: number) {
        return this.taskSomeoneService.getCurrentStateDescription(stateCode);
    }

    getStateOptionDescription(stateCode: number) {
        return this.taskSomeoneService.getStateOptionDescription(stateCode);
    }

    changeTaskToNextStatus(taskSomeone: any, modalContent: any) {
        let msg;
        if(taskSomeone.isSubTask === false){
            if(taskSomeone.state == TaskState.APPLICATIONS_OPEN){
                msg = 'Are you sure that do you want to close the applications for this task?';
            } else if (taskSomeone.state == TaskState.CREATED){
                msg = 'Are you sure that do you want to open the applications for this task?';
            } else if (taskSomeone.state == TaskState.APPLICATIONS_CLOSED){
                msg = 'Confirm task start? ' +
                        '<b>A message will automatically be sent to all ' +
                        'the task participants</b>, warning them that the task has started.';
                        
                if(taskSomeone.frequency != null) {
                    msg += '<br> And <b>subtasks will be created</b> as well, accordinly to the specified task frequency.'
                }
            } else if (taskSomeone.state == TaskState.STARTED){
                msg = 'Confirm the task conclusion?';
                if(taskSomeone.subTasks.length > 0){
                    msg +='<br>Make sure to <b>finish all subtasks</b> from this task in order to conclude it.';
                }    
            }
        }
        
        const that = this;
        if(msg){
            this.alertify.confirmation('Confirmation', msg, () => {
                that.taskSomeoneService.changeTaskToNextState(taskSomeone.id).subscribe((tasksomeoneRes: any) => {
                    that.taskSomeone = tasksomeoneRes;

                    if(that.taskSomeone.state == TaskState.DONE) {
                        this.open(modalContent, 'rateParticipantsModal');
                    }
                }, error => {
                    that.alertify.error(error.message);
                })
            });
        } else {
            this.taskSomeoneService.changeTaskToNextState(taskSomeone.id).subscribe((tasksomeoneRes: any) => {
                that.taskSomeone = tasksomeoneRes;
            }, error => {
                that.alertify.error(error.message);
            })           
        }
        
    }

    changeTaskToPreviousState(taskSomeone: any) {
        this.taskSomeoneService.changeTaskToPreviousState(taskSomeone.id).subscribe((tasksomeoneRes: any) => {
            this.taskSomeone = tasksomeoneRes;
        }, error => {
            this.alertify.error(error.message);
        });
    }

    changeTaskToCancelled(taskSomeone: any) {
        const that = this;

        this.alertify.confirmation('Confirmation', 'Are you sure that do you want to CANCEL this task? This can\'t be undone!', () => {
            that.taskSomeoneService.changeTaskToCancelled(taskSomeone.id).subscribe((tasksomeoneRes: any) => {
                that.taskSomeone = tasksomeoneRes;
            }, error => {
                that.alertify.error(error.message);
            })
        });
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

    showSubTasksButton(taskSomeone: any) {
        return this.taskSomeoneService.isPeriodic(taskSomeone) && this.taskSomeone.state >= TaskState.STARTED;
    }
}
