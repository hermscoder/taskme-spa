import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment } from '../_models/Comment';
import { Pageable } from '../_models/Pageable';

@Injectable({
	providedIn: 'root'
})
export class TaskCommentService {

	baseUrl = environment.apiUrl + 'logged';

	constructor(private http: HttpClient) { }

	createTaskSomeone(model: Comment) {
		return this.http.post(this.baseUrl + '/comments', model);
	}
	deleteComment(commentId: number) {
		return this.http.delete(this.baseUrl + '/comments/' + commentId);
	}
	listWithPagination(pageable: Pageable, taskSomeoneId: number): Observable<any[]> {
		return this.http.get<Comment[]>(this.baseUrl + '/comments?taskSomeoneId=' + taskSomeoneId + (pageable ? pageable.buildRequestParamString() : ''));
	}
}
