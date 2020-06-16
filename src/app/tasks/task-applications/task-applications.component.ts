import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskApplicationService } from '../../_services/task-application.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Pageable } from 'src/app/_models/Pageable';
import { PaginationInfo } from 'src/app/_models/PaginationInfo';
import { TaskApplicationDetailsDTO } from '../../_models/TaskApplicationDetailsDTO';
import { FilterField } from '../../_models/FilterField';
import { FilterType } from '../../_models/FilterType';
import { Option } from '../../_models/Option';

@Component({
  selector: 'app-task-applications',
  templateUrl: './task-applications.component.html',
  styleUrls: ['./task-applications.component.css']
})
export class TaskApplicationsComponent implements OnInit {

	constructor(private route: ActivatedRoute, private alertify: AlertifyService, private taskApplicationService: TaskApplicationService) { }

  taskApplications: TaskApplicationDetailsDTO[] = [];
  paginationInfo: PaginationInfo;
  filters: FilterField[] = [];
  initValueSearchTerm: string;

  ngOnInit() {
    var that = this;
  	this.route.data.subscribe(data => {
      if(data['taskApplications'] != null){
      	that.taskApplications = data['taskApplications'].content;
        that.paginationInfo = new PaginationInfo(data['taskApplications']);

        that.route.params.subscribe(value => {
          if(value.taskTitle != null){
            that.initValueSearchTerm = value.taskTitle;
          }
        });
    	}
    });
    this.initializeFilterFields();
  }

  listWithPagination(pageable: Pageable) {
    this.taskApplicationService.listCurrentUserApplications(pageable).subscribe((page: any[]) => {
      this.taskApplications = page['content'];
      this.paginationInfo = new PaginationInfo(page);
    }, error => {
      this.alertify.error(error.message);
    });
  }

  initializeFilterFields() {
    this.filters.push( new FilterField('status', 
                                        'Status', 
                                        [
                                          new Option('All', ''),
                                          new Option('Pending', 'P'),
                                          new Option('Accepted', 'A'),
                                          new Option('Declined', 'D'),
                                          new Option('Cancelled by Applicant', 'C'),
                                          new Option('Task Closed', 'T')
                                        ]
                      , FilterType.RadioButton));
  }

  getClassFromStatus(status:string): string{
    return this.taskApplicationService.getClassFromStatus(status);
  }
}
