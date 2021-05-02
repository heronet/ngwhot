import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.authService.authenticatedUser$.pipe(take(1)).subscribe(authData => {
      if(authData) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${authData.token}`
          }
        })
      }
    });
    return next.handle(request);
  }
}
