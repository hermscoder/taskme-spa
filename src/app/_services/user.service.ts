import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/User';
import { AlertifyService } from './alertify.service';
import { catchError } from 'rxjs/operators';
import { UserDTO } from '../_models/UserDTO';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient, private alertify: AlertifyService) { }
  
  getUser(id): Observable<UserDTO> {
    return this.http.get<UserDTO>(this.baseUrl + 'logged/users/' + id);
  }
  
  updateUser(user: any) {
    return this.http.put(this.baseUrl + 'logged/users/' + user.id, user, httpOptions);
  }
  
  updateUserPassword(userPassChange: any) {
    return this.http.post(this.baseUrl + 'logged/users/passwordChange', userPassChange, httpOptions);
  }
  
  rateUser(id: any, rate: number) {
    return this.http.post(this.baseUrl + 'logged/users/' + id + '/rate?rate=' + rate, httpOptions);
  }
}
