import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService extends DataService {

  customQuery = environment.apiUrl + 'orderDetails/search/findById_OrderId_Id?orderId=';

  constructor(http: HttpClient,
              private myHttp: HttpClient) {
    super(environment.apiUrl + 'orderDetails/', http);
  }

  findByOrderId(id: any) {
    return this.myHttp.get(this.customQuery + id)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }
}
