import { Injectable } from '@angular/core';
import { TaskSomeone } from '../_models/TaskSomeone';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/User';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';

@Injectable()

export class UserEditResolver implements Resolve<User> {
  constructor(private userService: UserService, private authService: AuthService,
    private router: Router, private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
      // catch any errors, if we have problems, we redirect and print a message for the user
      return this.userService.getUser(this.authService.decodedToken.id).pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving your data');
          this.router.navigate(['findTasks']);
          return of(null);
        })
      );
    }
}
