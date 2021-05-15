import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '../service/auth.service';

@Injectable()
export class TokenInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const skipIntercept = request.headers.get('skip-interceptor');

    if (skipIntercept) {
      return next.handle(request);
    }

    if (this.authService.isConnected()) {
      request = request.clone({
        setHeaders: { authorization: `Bearer ${this.authService.getSessionToken()}` }
      });
    }

    return next.handle(request);
  }
}
