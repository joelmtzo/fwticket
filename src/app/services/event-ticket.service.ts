import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventTicketService extends DataService {

  customQuery = environment.apiUrl + 'eventTickets/search/findByEventId_Id?eventId=';

  constructor(http: HttpClient, private myHttp: HttpClient) {
    super(environment.apiUrl + 'eventTickets/', http);
  }

  findAllByEventId(eventId: any): Observable<any> {
    return this.myHttp.get(this.customQuery + eventId)
    .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

}
