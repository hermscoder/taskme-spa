import { Component, OnInit } from '@angular/core';
import { TaskSomeone } from '../../_models/TaskSomeone';
import { TaskSomeoneService } from '../../_services/task-someone.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-created-tasks',
  templateUrl: './created-tasks.component.html',
  styleUrls: ['./created-tasks.component.css']
})
export class CreatedTasksComponent implements OnInit {
  tasks: TaskSomeone[];
  constructor(private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.loadMyTasks();
  }

  loadMyTasks() {
    this.taskSomeoneService.listCurrentUserTasks().subscribe((tasks: TaskSomeone[]) => {
      this.tasks = tasks;
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
