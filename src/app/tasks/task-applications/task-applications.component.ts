import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskApplicationService } from '../../_services/task-application.service';

@Component({
  selector: 'app-task-applications',
  templateUrl: './task-applications.component.html',
  styleUrls: ['./task-applications.component.css']
})
export class TaskApplicationsComponent implements OnInit {

	taskApplications: any[] = [];

  constructor(private route: ActivatedRoute, private taskApplicationService: TaskApplicationService) { }

  ngOnInit() {
  	this.route.data.subscribe(data => {
      if(data['taskApplications'] != null){
      	this.taskApplications = data['taskApplications'].content;
    	}
    });
  }

}
