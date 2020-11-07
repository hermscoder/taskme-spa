import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TaskApplicationDetailsDTO} from '../../_models/TaskApplicationDetailsDTO';
import {TaskApplicationService} from '../../_services/task-application.service';
import {AlertifyService} from '../../_services/alertify.service';


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

    constructor(private taskApplicationService: TaskApplicationService, private alertify: AlertifyService) {
    }

    ngOnInit() {
    }

    cancelTaskApplication() {
        var that = this;
        this.alertify.confirmation('Confirmation', 'After cancelling your application <b>you can not apply to the same task again</b>. Do you confirm the cancellation?', () => {
            that.taskApplicationService.cancelTaskApplication(this.taskApplication).subscribe((result: TaskApplicationDetailsDTO) => {
                that.taskApplication = result;
                that.applicationClass = this.taskApplicationService.getClassFromStatus(that.taskApplication.status);
            }, error => {
                that.alertify.error(error.message);
            });
        });

    }

    getCardClass(status) {
        return this.taskApplicationService.getClassFromStatus(status);
    }

    getColorClass(status) {
        if (['ACCEPTED', 'CANCELLED_BY_APPLICANT', 'TASK_CLOSED'].indexOf(status) > -1) {
            return 'light-';
        } else {
            return '';
        }
    }

    isCancellable(status) {
        return ['PENDING', 'ACCEPTED'].indexOf(status) > -1;
    }
}
