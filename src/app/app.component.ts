import {Component} from '@angular/core';
import {ShoppingCartService} from './services/shopping-cart.service';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fwticket';

  constructor(private cartSvc: ShoppingCartService,
              private authSvc: AuthService) {
  }

  getCartCount() {
    return this.cartSvc.getCount();
  }

  logout(): void {
    this.authSvc.logout();
  }

  isLoggedIn(): boolean {
    return this.authSvc.isLoggedIn();
  }
}
