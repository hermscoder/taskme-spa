import { Component, OnInit } from '@angular/core';
import { TaskSomeone } from '../../_models/TaskSomeone';
import { ConversationDTO } from '../../_models/ConversationDTO';
import { MessageDTO } from 'src/app/_models/MessageDTO';
import { UserDTO } from 'src/app/_models/UserDTO';
import { TaskSomeoneService } from '../../_services/task-someone.service';
import { MessageService } from '../../_services/message.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-task-someone-detail',
  templateUrl: './task-someone-detail.component.html',
  styleUrls: ['./task-someone-detail.component.css']
})
export class TaskSomeoneDetailComponent implements OnInit {
  taskSomeone: TaskSomeone;

  constructor(private taskSomeoneService: TaskSomeoneService, private alertify: AlertifyService,
    private route: ActivatedRoute, private modalService: NgbModal, private messageService: MessageService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.taskSomeone = data['taskSomeone'];
    });
  }

  open(content) {
    this.modalService.open(content, {size: 'sm', ariaLabelledBy: 'modal-basic-title', backdrop: 'static', keyboard: true});
  }

  sendInterestedMessage(modal, textMsg){
    this.messageService.sendMessageTo(textMsg, this.taskSomeone.user.id).subscribe((result)=>{
      modal.dismiss();
    });
  }

  itsOwnTask(){
    
  }
}
