import { Component, OnInit } from '@angular/core';
import { TaskSomeone } from '../../_models/TaskSomeone';
import { TaskSomeoneService } from '../../_services/task-someone.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-someone-detail',
  templateUrl: './task-someone-detail.component.html',
  styleUrls: ['./task-someone-detail.component.css']
})
export class TaskSomeoneDetailComponent implements OnInit {
  taskSomeone: TaskSomeone;

  constructor(private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.taskSomeone = data['taskSomeone'];
    });
    // this.loadTaskSomeone();
  }

  // loadTaskSomeone() {
  //   // adding a + because we want to convert the string param to a number
  //   this.taskSomeoneService.getTask(+this.route.snapshot.params['id']).subscribe((taskSomeone: TaskSomeone) => {
  //     this.taskSomeone = taskSomeone;
  //   }, error => {
  //     this.alertify.error(error.message);
  //   });
  // }
}
