import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize, tap } from 'rxjs';
import { SpinnerService } from './shared/spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(private loader: SpinnerService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.loader.setLoading(true);
    console.log('Inizio caricamento')
    return next.handle(req).pipe(
      tap(_ => console.log('Fine caricamento')), 
      finalize(() => this.loader.setLoading(false))
    );
  }
}
