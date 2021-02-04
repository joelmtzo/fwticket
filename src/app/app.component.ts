import { Component } from '@angular/core';
import {ShoppingCartService} from './services/shopping-cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fwticket';

  constructor(private cartSvc: ShoppingCartService) {
  }

  getCartCount() {
    return this.cartSvc.getCount();
  }
}
