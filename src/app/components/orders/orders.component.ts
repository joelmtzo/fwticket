import {Component, OnInit} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {OrderService} from '../../services/order.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: [];

  constructor(private router: Router,
              private helper: JwtHelperService,
              private orderSvc: OrderService) {
  }

  ngOnInit(): void {
    const tokenDecoded = this.helper.decodeToken(this.helper.tokenGetter());

    this.orderSvc.findAllByUsername(tokenDecoded.username)
      .subscribe(response => this.orders = response['_embedded'].orders);
  }

  getOrderDetail(order): void {
    this.router.navigate(['/profile/order', order.id]);
  }

}
