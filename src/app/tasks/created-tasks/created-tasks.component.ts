import { Component, OnInit } from '@angular/core';
import { TaskSomeone } from '../../_models/TaskSomeone';
import { TaskSomeoneDetailsDTO } from '../../_models/TaskSomeoneDetailsDTO';
import { TaskSomeoneService } from '../../_services/task-someone.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Pageable } from 'src/app/_models/Pageable';
import { PaginationInfo } from 'src/app/_models/PaginationInfo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-created-tasks',
  templateUrl: './created-tasks.component.html',
  styleUrls: ['./created-tasks.component.css']
})
export class CreatedTasksComponent implements OnInit {
  tasks: TaskSomeoneDetailsDTO[];
  constructor(private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService, private route: ActivatedRoute) { }
  paginationInfo: PaginationInfo;
  initValueSearchTerm: string;

  ngOnInit() {
    this.route.params.subscribe(value => {
      if(value.title != null){
        this.initValueSearchTerm = value.title;
        var that = this;
        this.route.data.subscribe(data => {
          that.tasks = data['taskSomeoneList'].content;
          that.paginationInfo = new PaginationInfo(data['taskSomeoneList']);
        });
      } else {
        this.listWithPagination(new Pageable());
      }
    });
  }

  listWithPagination(pageable: Pageable) {
    this.taskSomeoneService.listCurrentUserCreatedTasks(pageable).subscribe((page: any[]) => {
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
