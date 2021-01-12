import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`intercept()`);
    if (this.auth.isUserLoggedIn()) {
      const cloned: HttpRequest<any> = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.auth.getToken()}`)
      });
      return next.handle(cloned);
    }
    else {
      return next.handle(request);
    }
  }
}
