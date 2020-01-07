import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HTTP_INTERCEPTORS,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(errorResponse => {
        if (errorResponse instanceof HttpErrorResponse) {
          // not using this yet
          // const applicationError = errorResponse.headers.get('Application-Error');
          // if (applicationError) {
          //   return throwError(applicationError);

          // }
          const serverError = errorResponse.error;
          // let modalStateError = '';

          if (serverError && typeof serverError === 'object') {
            if (serverError.status === 'UNAUTHORIZED' || serverError.status === 401) {
              return throwError(serverError);
            } else if (serverError.status === 'BAD_REQUEST') {
              // for bad_request we return the error object, we deal with this on the controller.
              // modalStateError += serverError.message + '\n';
              // if (serverError.field) {
              //   modalStateError +=
              //     serverError.field + ': ' + serverError.message + '\n';
              // }
              // for (const key in serverError.subErrors) {
              //   if (serverError.subErrors[key]) {
              //     modalStateError +=
              //       serverError.subErrors[key].field + ': ' + serverError.subErrors[key].message + '\n';
              //   }
              // }
            } else {
              return throwError(serverError);
            }
          }
          // not using this because we return an object error when the status is BAD_REQUEST
          // return throwError(serverError || 'Server Error');
          return throwError(serverError || 'Server Error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
