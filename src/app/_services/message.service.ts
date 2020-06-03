import { Injectable } from '@angular/core';
import { Pageable } from '../_models/Pageable';
import { Observable } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  baseUrl = environment.apiUrl + 'logged';

  constructor(private http: HttpClient) { }

  listMessagesWithPagination(pageable: Pageable, conversationId: number): Observable<any[]> {
    return this.http.get<Message[]>(this.baseUrl + '/messages/' + conversationId + '?' + (pageable ? pageable.buildRequestParamString() : '') );
  }
}
