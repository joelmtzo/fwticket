import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {OrderService} from '../services/order.service';
import {OrderDetailService} from '../services/order-detail.service';
import {log} from 'util';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items = [];

  constructor(
    private orderSvc: OrderService,
    private orderDetailSvc: OrderDetailService,
    private cartSvc: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.cartSvc.getItems()
      .subscribe(items => this.items = items);
  }

  makeOrder(): void {
    const order = {
      date: new Date(),
      total: this.cartSvc.total,
      notes: '',
      status: 1,
      customerId: 'https://localhost:8080/customers/1'
    };

    this.orderSvc.create(order).subscribe(response => {

      this.cartSvc.items.forEach(item => {
        const detail = {
          id: {
            orderId: response.body['_links'].self.href,
            eventTicketsId: item.eventTicketId
          },
          quantity: item.quantity,
          price: item.price
        };

        this.orderDetailSvc.create(detail).subscribe(srvResponse => {
          srvResponse.status === 201 ? console.log('Listo') : console.log('Naríz');
        });
      });

      // this.cartSvc.empty();
    });
  }
}
