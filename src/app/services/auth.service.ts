import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
              private http: HttpClient,
              private helper: JwtHelperService) {
  }

  get isAdmin(): boolean {
    const token = this.helper.tokenGetter();
    const decoded = this.helper.decodeToken(token).roles;
    return decoded.includes('ADMIN');
  }

  getUserDetails(username): Observable<any> {
    return this.http
      .get(environment.apiUrl + 'customers/search/findByUserId_Username?username=' + username, {observe: 'response'})
      .pipe(map(response => response));
  }

  login(credenciales): Observable<any> {
    return this.http
      .post(environment.apiUrl + 'login', JSON.stringify(credenciales), {observe: 'response'})
      .pipe(
        map(response => response)
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('customerId');
    this.router.navigate(['']);
  }

  isLoggedIn(): boolean {
    return !this.helper.isTokenExpired();
  }
}
