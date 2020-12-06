import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/_models/Comment';
import { TaskSomeoneDetailsDTO } from 'src/app/_models/TaskSomeoneDetailsDTO';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { TaskSomeoneService } from 'src/app/_services/task-someone.service';

@Component({
  selector: 'app-subtask-details',
  templateUrl: './subtask-details.component.html',
  styleUrls: ['./subtask-details.component.css']
})
export class SubtaskDetailsComponent implements OnInit {

  @Input() subTask: TaskSomeoneDetailsDTO;
  
  subTasksComments: Comment[];
  constructor(private alertify: AlertifyService, private taskSomeoneServive: TaskSomeoneService, private authService: AuthService) { }

  ngOnInit() {
    this.subTasksComments = [];
  }

  getGoogleMapsUrl(location: string) {
    let url = 'https://www.google.com/maps/search/';
    return url + location;
  }

  addComment(commentMsgTxtArea){
    if(commentMsgTxtArea.value != ''){
      let newComment = new Comment();
      newComment.content = commentMsgTxtArea.value;
      newComment.sentTime = new Date();
      newComment.userSender = this.authService.currentUser;
  
      this.subTasksComments.push(newComment)
      commentMsgTxtArea.value = '';
    }
  }

}
