import {Component, OnInit} from '@angular/core';
import {TaskSomeoneDetailsDTO} from '../../_models/TaskSomeoneDetailsDTO';
import {TaskSomeoneService} from '../../_services/task-someone.service';
import {AlertifyService} from '../../_services/alertify.service';
import {Pageable} from 'src/app/_models/Pageable';
import {PaginationInfo} from 'src/app/_models/PaginationInfo';
import {ActivatedRoute} from '@angular/router';
import { DateUtils } from 'src/app/_utils/DateUtils';

@Component({
  selector: 'app-punctual-tasks',
  templateUrl: './punctual-tasks.component.html',
  styleUrls: ['./punctual-tasks.component.css']
})
export class PunctualTasksComponent implements OnInit {

    punctualTasks: TaskSomeoneDetailsDTO[];

    constructor(private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService, private route: ActivatedRoute) {
    }

    paginationInfo: PaginationInfo;


    ngOnInit() {
        this.route.data.subscribe(data => {
            this.punctualTasks = data['punctualTasksList'].content;
            this.paginationInfo = new PaginationInfo(data['punctualTasksList']);
        });
    }

    listWithPagination(pageable: Pageable) {
        this.taskSomeoneService.listCurrentUserTasks(pageable).subscribe((page: any[]) => {
            this.punctualTasks = page['content'];
            this.paginationInfo = new PaginationInfo(page);
        }, error => {
            this.alertify.error(error.message);
        });
    }

    getRiskClass(task: TaskSomeoneDetailsDTO) {
        return this.taskSomeoneService.getPunctualTaskRisk(task);
    }

    outDatedTask(task) {
        let diffInDays = DateUtils.datediffInDays(new Date(), new Date(task.endDate), false);
        if(diffInDays < 0)
            return true;
        else
            return false;
    }

}

