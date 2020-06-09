import { Injectable } from '@angular/core';
import { Pageable } from '../_models/Pageable';
import { MessageDTO } from '../_models/MessageDTO';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.apiUrl + 'logged';

  constructor(private http: HttpClient) { }

  listMessagesWithPagination(pageable: Pageable, conversationId: number): Observable<any[]> {
    return this.http.get<MessageDTO[]>(this.baseUrl + '/messages/' + conversationId + '?' + (pageable ? pageable.buildRequestParamString() : '') );
  }

  sendMessageTo(messageTxt, userId){
  	var message = new MessageDTO();
  	message.content = messageTxt;
  	return this.http.post(this.baseUrl + '/message/send/' + userId, message);
  }
}
