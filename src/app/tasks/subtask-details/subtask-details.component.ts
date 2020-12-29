import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { Comment } from 'src/app/_models/Comment';
import { Pageable } from 'src/app/_models/Pageable';
import { PaginationInfo } from 'src/app/_models/PaginationInfo';
import { TaskSomeoneDetailsDTO } from 'src/app/_models/TaskSomeoneDetailsDTO';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { TaskCommentService } from 'src/app/_services/task-comment.service';
import { TaskSomeoneService } from 'src/app/_services/task-someone.service';

@Component({
	selector: 'app-subtask-details',
	templateUrl: './subtask-details.component.html',
	styleUrls: ['./subtask-details.component.css']
})
export class SubtaskDetailsComponent implements OnInit {

	@Input() subTask: TaskSomeoneDetailsDTO;

	subTasksComments: Comment[];
	paginationInfo: PaginationInfo;

	constructor(private alertify: AlertifyService, private taskSomeoneServive: TaskSomeoneService, private authService: AuthService,
		private taskCommentService: TaskCommentService) { }

	ngOnInit() {
		this.subTasksComments = [];
		this.listWithPagination(new Pageable());
	}

	listWithPagination(pageable: Pageable) {
		this.taskCommentService.listWithPagination(pageable, this.subTask.id).subscribe((page: any[]) => {
			this.subTasksComments = page['content'];
			this.paginationInfo = new PaginationInfo(page);
		}, error => {
			this.alertify.error(error.message);
		});
	}

	getGoogleMapsUrl(location: string) {
		let url = 'https://www.google.com/maps/search/';
		return url + location;
	}

	addComment(commentMsgTxtArea) {
		if (commentMsgTxtArea.value != '') {
			let newComment = Comment.factory(
				commentMsgTxtArea.value,
				new Date(),
				this.authService.currentUser,
				this.subTask.id);

			this.taskCommentService.createTaskSomeone(newComment).subscribe(() => {
				this.listWithPagination(new Pageable());
				this.subTasksComments.unshift(newComment);
				commentMsgTxtArea.value = '';
				this.alertify.success('Comment successfully added');
			  }, error => {
				var errorMsg;
				if(error.subErrors != null){
				  errorMsg = error.subErrors[0].message;
				} else {
				  errorMsg = error.message
				}
				this.alertify.error(errorMsg);
			  });
			
		}
	}

	deleteComment(commentId: number) {
		let that = this;
		this.alertify.confirmation('Confirmation','Are you sure do you want to delete this comment?', () => {
            that.taskCommentService.deleteComment(commentId).subscribe((res: any) => {
				let newCommentsArray = [];
				for(let c of that.subTasksComments){
					//adding all the elements but the one with the delete id;
					if(c.id != commentId){
						newCommentsArray.push(c);
					}
				}
				that.subTasksComments = newCommentsArray;
				that.alertify.warning('Comment successfully deleted');
			});
        });
	}

	canDeleteComment(comment: Comment): boolean {
		let currentUser = this.authService.currentUser;
		return comment.userSender.id == currentUser.id || this.subTask.user.id == currentUser.id;
	}

	getCurrentStateDescription(stateCode: number) {
        return this.taskSomeoneServive.getCurrentStateDescription(stateCode);
    }
    getStateClass(stateCode: number, outline: boolean = false) {
        return this.taskSomeoneServive.getStateClass(stateCode, outline);
    }
}
