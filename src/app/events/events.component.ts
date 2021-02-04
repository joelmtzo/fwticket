import {Component, OnInit} from '@angular/core';
import {EventsService} from '../services/events.service';
import {FormControl, FormGroup} from '@angular/forms';
import {VenueService} from '../services/venue.service';
import {Router} from '@angular/router';
import {TicketTypeService} from '../services/ticket-type.service';
import {EventTicketService} from '../services/event-ticket.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any = [];
  venues: any = [];
  ticketTypes: any = [];
  subs: any = [];

/*  form = new FormGroup({
    title: new FormControl('', []),
    description: new FormControl('', []),
    isActive: new FormControl('true', []),
    isVisible: new FormControl('true', []),
    venueId: new FormControl('', []),
  });*/

  form = new FormGroup({
    eventId: new FormControl('', []),
    ticketTypeId: new FormControl('', []),
    stock: new FormControl('', []),
    price: new FormControl('', []),
  });

  constructor(private eventSvc: EventsService,
              private venueSvc: VenueService,
              private ticketTypesSvc: TicketTypeService,
              private eventTicketSvc: EventTicketService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.eventSvc.getAll()
      .subscribe(response => this.events = response['_embedded'].events);

    this.venueSvc.getAll()
      .subscribe(response => this.venues = response['_embedded'].venues);

    this.ticketTypesSvc.getAll()
      .subscribe(response => this.ticketTypes = response['_embedded'].ticketTypes);
  }

  saveEvent(formData) {
    this.eventSvc.create(this.buildObject(formData)).subscribe(response => {
      this.onReset();

      this.eventSvc.getAll().subscribe(
        (response) => {
          this.events = response['_embedded'].events;
        }
      );
    });
  }

  onReset(): void {
    this.form.reset();
  }

  /*  buildObject(formData) {
      return {
        title: formData.title,
        description: formData.description,
        isActive: formData.isActive,
        isVisible: formData.isVisible,
        venueId: formData.venueId,
      };
    }*/

    buildObject(formData) {
      return {
        eventId: formData.eventId,
        ticketTypeId: formData.ticketTypeId,
        stock: formData.stock,
        price: formData.price,
      };
    }

  onRedirect(event: any) {
    const eventId = event._links.self.href.replace(/[\D8080]/g, '');
    this.router.navigate(['/event', eventId]);
  }

  saveTickets(formData) {
    this.eventTicketSvc.create(this.buildObject(formData)).subscribe();
    this.onReset();
  }
}
