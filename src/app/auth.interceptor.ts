import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from 'src/services/user.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: { Authorization: `Bearer ${this._userService.authToken}` }
  });

    return next.handle(request);
}
}
