import { Component, OnInit } from '@angular/core';
import { TaskSomeone } from '../../_models/TaskSomeone';
import { TaskSomeoneService } from '../../_services/task-someone.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Pageable } from 'src/app/_models/Pageable';
import { PaginationInfo } from 'src/app/_models/PaginationInfo';

@Component({
  selector: 'app-created-tasks',
  templateUrl: './created-tasks.component.html',
  styleUrls: ['./created-tasks.component.css']
})
export class CreatedTasksComponent implements OnInit {
  tasks: TaskSomeone[];
  constructor(private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService) { }
  paginationInfo: PaginationInfo;

  ngOnInit() {
    this.listWithPagination(new Pageable());
  }

  listWithPagination(pageable: Pageable) {
    this.taskSomeoneService.listCurrentUserTasks(pageable).subscribe((page: any[]) => {
      this.tasks = page['content'];
      this.paginationInfo = new PaginationInfo(page);
    }, error => {
      this.alertify.error(error.message);
    });
  }

  onTaskUpdated(res: any) {
    let index = this.tasks.indexOf(this.tasks.find(x => x.id === res.id));
    // changing the value of the edited task to the new one after editing.
    if(index != -1){
      this.tasks[index] = res;
    }
  }
}
