import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {BadInput} from '../common/bad-input';
import {NotFoundError} from '../common/not-found-error';
import {AppError} from '../common/app-error';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(@Inject('API_BASE_URL') private url: string, private http: HttpClient) {
  }

  getById(id) {
    return this.http
      .get(this.url + id)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  getAll() {
    return this.http
      .get(this.url)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  create(resource) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http
      .post(this.url, JSON.stringify(resource), {headers, observe: 'response'})
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  update(id, resource) {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/json; charset=utf-8'
    );
    return this.http
      .put(this.url + '/' + id, JSON.stringify(resource), {headers, observe: 'response'})
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  delete(id) {
    return this.http
      .delete(this.url + '/' + id)
      .pipe(
        map(response => response),
        catchError(this.handleError)
      );
  }

  handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new BadInput(error));
    }

    if (error.status === 404) {
      return throwError(new NotFoundError());
    }

    return throwError(new AppError(error));
  }
}
