import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskSomeone } from '../../_models/TaskSomeone';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-someone-card',
  templateUrl: './task-someone-card.component.html',
  styleUrls: ['./task-someone-card.component.css']
})
export class TaskSomeoneCardComponent implements OnInit {
  @Input() taskSomeone: TaskSomeone;
  @Input() editMode: boolean;

  @Output() taskUpdated = new EventEmitter<any>();

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  open(content, modalName) {
    if(modalName == 'editTaskModal'){
      this.modalService.open(content, {size: 'lg', ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: false});
    } else if(modalName == 'taskApplicationsModal'){
      this.modalService.open(content, {size: 'lg', windowClass: 'taskApplicationsModal', ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: true});
    }
  }

  onTaskUpdatedSuccessfully(res: any) {
    this.taskUpdated.emit(res);
  }

  updateTaskSomeone(taskSomeoneUpdated: any){
    if(taskSomeoneUpdated != null){
      this.taskSomeone = taskSomeoneUpdated;
    }
  }

  isOpenForApplications(taskSomeone: any): boolean {
    return taskSomeone.participants.length == 0;
  }
}
