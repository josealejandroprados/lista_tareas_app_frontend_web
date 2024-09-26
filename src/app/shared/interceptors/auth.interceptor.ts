import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private cookie:CookieService
  ){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // obtengo el token en caso de que exista
    const token = this.cookie.get('token');

    if(token){
      const requestCloned = request.clone({
        headers: request.headers.set('Auth',token)
      });

      return next.handle(requestCloned);
    }
    else{
      return next.handle(request);
    }
  }
}
