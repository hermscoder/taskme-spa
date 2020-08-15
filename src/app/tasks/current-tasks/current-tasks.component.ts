import { Component, OnInit } from '@angular/core';
import { TaskSomeoneDetailsDTO } from '../../_models/TaskSomeoneDetailsDTO';
import { TaskSomeoneService } from '../../_services/task-someone.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Pageable } from 'src/app/_models/Pageable';
import { PaginationInfo } from 'src/app/_models/PaginationInfo';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-current-tasks',
  templateUrl: './current-tasks.component.html',
  styleUrls: ['./current-tasks.component.css']
})
export class CurrentTasksComponent implements OnInit {
	currentTasks: TaskSomeoneDetailsDTO[];
  constructor(private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService, private route: ActivatedRoute) { }
	paginationInfo: PaginationInfo;


  ngOnInit() {
    this.route.data.subscribe(data => {
      this.currentTasks = data['currentTasksList'].content;
      this.paginationInfo = new PaginationInfo(data['currentTasksList']);
    });
  }

  listWithPagination(pageable: Pageable) {
    this.taskSomeoneService.listCurrentUserTasks(pageable).subscribe((page: any[]) => {
      this.currentTasks = page['content'];
      this.paginationInfo = new PaginationInfo(page);
    }, error => {
      this.alertify.error(error.message);
    });
  }

  getRiskClass(task: TaskSomeoneDetailsDTO){
  	if(!task.dueDate) {
  		return 'none';
  	}

		var dateDiff = this.datediff( new Date(task.dueDate), new Date(task.createdOn) );
  	if(dateDiff < 5) {
  		return 'danger';
  	} else if(dateDiff < 10){
  		return 'attention';
  	} else if(dateDiff < 15){
  		return 'some';
  	} else {
  		return 'none';
  	}
  }
  datediff(first, second): number {
    return Math.abs(Math.round((second-first)/(1000*60*60*24)));
	}

}
