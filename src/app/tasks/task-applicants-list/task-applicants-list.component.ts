import {Component, Input, Output, OnInit, EventEmitter} from '@angular/core';
import {TaskSomeoneDetailsDTO} from '../../_models/TaskSomeoneDetailsDTO';
import {TaskSomeoneForListDTO} from '../../_models/TaskSomeoneForListDTO';
import {TaskApplicationDetailsDTO} from '../../_models/TaskApplicationDetailsDTO';
import {UserDTO} from '../../_models/UserDTO';
import {AlertifyService} from '../../_services/alertify.service';
import {TaskApplicationService} from '../../_services/task-application.service';
import {TaskSomeoneService} from '../../_services/task-someone.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SendMessageComponent} from '../../generics/send-message/send-message.component';

@Component({
    selector: 'app-task-applicants-list',
    templateUrl: './task-applicants-list.component.html',
    styleUrls: ['./task-applicants-list.component.css']
})
export class TaskApplicantsListComponent implements OnInit {

    @Input() taskSomeone: TaskSomeoneDetailsDTO;
    @Input() showOnlyApprovedApplicants: boolean;
    @Output() onCloseModal = new EventEmitter<any>();
    @Output() onUpdateTaskStatus = new EventEmitter<any>();
    selectedApplicant: any;
    inputUserFilter: string;

    constructor(private alertify: AlertifyService, private modalService: NgbModal, private taskApplicationService: TaskApplicationService, private taskSomeoneService: TaskSomeoneService) {
    }

    ngOnInit() {
    }

    openUpdateStatusMsgModal(applicant, newStatus) {
        this.openModal(applicant, newStatus, this.taskSomeone);
    }

    openModal(applicant, newStatus, taskSomeone) {
        const modalRef = this.modalService.open(SendMessageComponent);
        modalRef.componentInstance.messageTo = applicant.user.givenName;
        modalRef.componentInstance.msgStateType = newStatus;
        modalRef.componentInstance.relatedId = applicant.taskApplicationId;
        if (newStatus == 'A') {
            modalRef.componentInstance.defaultMsg = 'Hey ' + applicant.user.givenName + ', I choose you to do the task \'' + taskSomeone.title + '\'!';
        } else if (newStatus == 'D') {
            modalRef.componentInstance.defaultMsg = 'Hello ' + applicant.user.givenName + ', I am sorry to say this, but another person got approved to do the task \'' + taskSomeone.title + '\'. But let\'s keep in touch, ok? See ya!';
        }

        modalRef.result.then((result) => {
            this.sendMessage(result);
        }, (reason) => {
        });
    }

    sendMessage(object: any) {
        this.sendAndUpdateStatusMsg(object.msg, object.msgStateType, object.relatedId);
    }

    sendAndUpdateStatusMsg(textMsg, msgStateType, taskApplicationId) {
        const that = this;
        this.taskApplicationService.changeTaskApplicationStatus(textMsg, msgStateType, taskApplicationId).subscribe((data: TaskApplicationDetailsDTO) => {
                that.taskSomeone.taskApplicants.forEach(applicant => {
                    if (applicant.taskApplicationId == data.id) {
                        applicant.taskApplicationStatus = data.status;
                    }
                });
            }, error => {
                let errorMsg;
                if (error.subErrors != null) {
                    errorMsg = error.subErrors[0].message;
                } else {
                    errorMsg = error.message;
                }
                this.alertify.error(errorMsg);
            }
        );
    }

    open(content, modalName) {
        this.modalService.open(content, {size: 'sm', ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: true});
    }

    getClassFromStatus(status: string): string {
        return this.taskApplicationService.getClassFromStatus(status);
    }

    terminateApplications() {
        const that = this;
        if (this.taskSomeone.taskApplicants.length == 0) {
            that.alertify.error('You cant terminate applications because you have no applicants for this task');
            return;
        }
        let approvedApplicants = this.taskSomeone.taskApplicants.filter(applicant => applicant.taskApplicationStatus == 'ACCEPTED');
        if (approvedApplicants.length == 0) {
            that.alertify.error('You cant terminate applications because you have no approved applicants for this task');
            return;
        }

        this.alertify.confirmation('Confirmation', 'Are you sure that do you want to close the applications for this task?', () => {
            that.taskSomeoneService.terminateApplications(that.taskSomeone).subscribe((result) => {
                that.taskSomeone = result as TaskSomeoneDetailsDTO;
                that.onUpdateTaskStatus.emit(this.taskSomeone);
            });
        });
    }

    openApplications() {
        const that = this;

        this.alertify.confirmation('Confirmation', 'Are you sure that do you want to open the applications for this task?', () => {
            that.taskSomeoneService.openApplications(that.taskSomeone).subscribe((result) => {
                that.taskSomeone = result as TaskSomeoneDetailsDTO;
                that.onUpdateTaskStatus.emit(this.taskSomeone);
            });
        });
    }


    closeModal() {
        this.onCloseModal.emit(this.taskSomeone);
    }

    changeSelectedApplicant(user) {
        this.selectedApplicant = user;
        if (this.selectedApplicant.previousTasks == null) {
            const that = this;
            this.taskSomeoneService.findPreviousTasksFromUser(user.id).subscribe((result) => {
                this.selectedApplicant.previousTasks = result;
            });
        }

    }

    isOpenForApplications(taskSomeone: any): boolean {
        return this.taskSomeoneService.isOpenForApplications(taskSomeone);
    }

    isClosedForApplications(taskSomeone: TaskSomeoneDetailsDTO) {
        return this.taskSomeoneService.isClosedForApplications(taskSomeone);
    }
}
