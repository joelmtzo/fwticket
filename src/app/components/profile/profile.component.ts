import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {OrderDetailService} from '../../services/order-detail.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  orderDetail: [];

  constructor() {
  }

  ngOnInit(): void {  }

}
