import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  notFound = false;
  urlForSignedUser = '/profile';
  loginSubscription: Subscription;
  userDetailsSubscription: Subscription;

  form = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private router: Router,
              private authService: AuthService,
              private helper: JwtHelperService) {
  }

  get isLoggedIn(): boolean {
    return this.helper.tokenGetter() !== null;
  }

  get username(): any {
    return this.form.get('username');
  }

  get password(): any {
    return this.form.get('password');
  }

  ngOnInit(): void {
    if (this.isLoggedIn) {
      this.router.navigate([this.urlForSignedUser]);
    }
  }

  ngOnDestroy(): void {
    // if (this.helper.tokenGetter()) {
    //   this.loginSubscription.unsubscribe();
    // }
    // if (localStorage.getItem('customerId')) {
    //   this.userDetailsSubscription.unsubscribe();
    // }
  }

  signIn(credenciales): any {
    if (this.form.valid) {
      this.loginSubscription = this.authService.login(credenciales)
        .subscribe(loginResponse => {
          const token = loginResponse.headers.get('Authorization');
          if (token) {
            localStorage.setItem('token', token);
            this.userDetailsSubscription = this.authService.getUserDetails(credenciales.username)
              .subscribe(userDetailsResponse => {
                localStorage.setItem('customerId', userDetailsResponse.body.id);
              });

            return this.router.navigate([this.urlForSignedUser]);
          }
        });
    }
  }

}
