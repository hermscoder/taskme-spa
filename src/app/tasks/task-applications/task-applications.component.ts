import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-applications',
  templateUrl: './task-applications.component.html',
  styleUrls: ['./task-applications.component.css']
})
export class TaskApplicationsComponent implements OnInit {

	taskApplications: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.data.subscribe(data => {
      this.taskApplications = data['taskApplications'];
    });
  }

}
