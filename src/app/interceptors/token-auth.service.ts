import {Injectable} from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenAuthInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(req, next) {
    const token = localStorage.getItem('token');

    if (token) {
      const reqClone = req.clone({
        setHeaders: {Authorization: token},
      });
      return next.handle(reqClone);
    }

    return next.handle(req);
  }

}
