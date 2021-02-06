import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventsService} from '../services/events.service';
import {EventTicketService} from '../services/event-ticket.service';
import {ShoppingCartService} from '../services/shopping-cart.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: any = [];
  eventId: any = [];
  eventTickets: any = [];

  constructor(private cartSvc: ShoppingCartService,
              private eventSvc: EventsService,
              private eventTicketsSvc: EventTicketService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.eventId = params['id']);

    this.eventSvc.getById(this.eventId, '?projection=eventProjection')
      .subscribe(response => this.event = response);

    this.eventTicketsSvc.findAllByEventId(this.eventId)
      .subscribe(response => this.eventTickets = response['_embedded'].eventTickets);
  }

  add2cart(id: number, price: number, title: string, ticketType: string): void {
    this.cartSvc.add({id, price, title, ticketType});
    Swal.fire('Item agregado', 'Se agregó a tu carrito de compras', 'success');
  }

}
