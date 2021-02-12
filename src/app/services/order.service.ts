import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends DataService {

  customQuery = environment.apiUrl + 'orders/search/findByCustomerId_UserId_Username?username=';

  constructor(http: HttpClient,
              private myHttp: HttpClient) {
    super(environment.apiUrl + 'orders/', http);
  }

  findAllByUsername(username: any): Observable<any> {
    return this.myHttp.get(this.customQuery + username)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }
}
