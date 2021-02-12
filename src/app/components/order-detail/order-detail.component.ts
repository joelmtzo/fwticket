import {Component, OnInit} from '@angular/core';
import {OrderDetailService} from '../../services/order-detail.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  orderId: any;
  orderDetail: [];

  constructor(private route: ActivatedRoute,
              private orderDetailSvc: OrderDetailService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.orderId = params['id']);

    this.orderDetailSvc.findByOrderId(this.orderId)
      .subscribe(response => this.orderDetail = response['_embedded'].orderDetails);
  }

}
