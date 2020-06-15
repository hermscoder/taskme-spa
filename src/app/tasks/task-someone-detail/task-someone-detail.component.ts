import { Component, OnInit } from '@angular/core';
import { TaskSomeone } from '../../_models/TaskSomeone';
import { ConversationDTO } from '../../_models/ConversationDTO';
import { MessageDTO } from 'src/app/_models/MessageDTO';
import { UserDTO } from 'src/app/_models/UserDTO';
import { TaskSomeoneDetailsDTO } from '../../_models/TaskSomeoneDetailsDTO';
import { TaskSomeoneService } from '../../_services/task-someone.service';
import { TaskApplicationService } from '../../_services/task-application.service';
import { MessageService } from '../../_services/message.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SendMessageComponent } from '../../generics/send-message/send-message.component';

@Component({
  selector: 'app-task-someone-detail',
  templateUrl: './task-someone-detail.component.html',
  styleUrls: ['./task-someone-detail.component.css']
})
export class TaskSomeoneDetailComponent implements OnInit {
  taskSomeone: TaskSomeoneDetailsDTO;

  constructor(private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService,
    private route: ActivatedRoute, private modalService: NgbModal, private messageService: MessageService,
    private taskApplicationService: TaskApplicationService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.taskSomeone = data['taskSomeone'];
    });
  }

  open(content, modalName) {
    // this.modalService.open(content, {size: 'sm', ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: true});
    const modalRef = this.modalService.open(SendMessageComponent);
    modalRef.componentInstance.messageTo = this.taskSomeone.user.givenName;
    modalRef.componentInstance.defaultMsg = 'Hello ' + this.taskSomeone.user.givenName + '! I saw that you created the task ' + this.taskSomeone.title + ' and I am interested in doing it.';
    modalRef.result.then((result) => {
      this.sendInterestedMessage(result.msg);
    }, (reason) => {
    });
  }

  sendInterestedMessage(textMsg){
    this.taskApplicationService.sendApplyMessageToTaskOwner(textMsg, this.taskSomeone.id).subscribe((result)=>{
      this.taskSomeone.alreadyApplied = true;
    });
  }
}
