import {Injectable} from '@angular/core';
import {DataService} from './data.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VenueService extends DataService {

  constructor(http: HttpClient) {
    super(environment.apiUrl + 'venues/', http);
  }
}
