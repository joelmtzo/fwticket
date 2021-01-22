import { Injectable } from '@angular/core';
import {DataService} from './data.service';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventTicketService extends DataService {

  constructor(http: HttpClient) {
    super(environment.apiUrl + 'cities/', http);
  }
}
