import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HTTP_ERRORS } from 'src/app/common/utility/constants';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor() { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({
            setHeaders: {
            }
        });
        return next.handle(request).pipe(catchError(err => {
            // tslint:disable-next-line: no-unused-expression
            HTTP_ERRORS.indexOf(err.status) > -1 && console.log('------------ Error in Intercepting data from API --------------');
            return throwError(err);
        }));
    }
}
