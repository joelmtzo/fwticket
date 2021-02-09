import {Component, OnInit} from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart.service';
import {OrderService} from '../../services/order.service';
import {OrderDetailService} from '../../services/order-detail.service';
import Swal from 'sweetalert2';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  items = [];

  constructor(
    private router: Router,
    private orderSvc: OrderService,
    private orderDetailSvc: OrderDetailService,
    private cartSvc: ShoppingCartService) {
  }

  ngOnInit(): void {
    this.cartSvc.getItems()
      .subscribe(items => this.items = items);
  }

  updateQuantity(item, qty) {
    this.cartSvc.updateQty(item, qty);
  }

  makeOrder(): void {
    const customerId = localStorage.getItem('customerId');
    if (!customerId) {
      this.router.navigate(['login']);
    }

    const order = {
      date: new Date(),
      total: this.cartSvc.total,
      notes: '',
      status: 1,
      customerId: environment.apiUrl + '/customers/' + customerId
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
          if (srvResponse.status === 201) {
            Swal.fire('Pedido Recibido', 'Recibirás un email de confirmación de tu pedido', 'success').then(result => {
              if (result.dismiss || result.isConfirmed) {
                this.router.navigate(['']);
              }
            });
            this.cartSvc.empty();
          } else {
            Swal.fire('Ups, algo salió mal', 'Tu petición no pudo ser procesada, intenta de nuevo.', 'info');
          }
        });
      });

      // this.cartSvc.empty();
    });
  }
}
