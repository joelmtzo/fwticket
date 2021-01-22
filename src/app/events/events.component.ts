import {Component, OnInit} from '@angular/core';
import {EventsService} from '../services/events.service';
import {FormControl, FormGroup} from '@angular/forms';
import {VenueService} from '../services/venue.service';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events: any;
  venues: any;

  form = new FormGroup({
    title: new FormControl('', []),
    description: new FormControl('', []),
    isActive: new FormControl('true', []),
    isVisible: new FormControl('true', []),
    venueId: new FormControl('', []),
  });

  constructor(private eventSvc: EventsService,
              private venueSvc: VenueService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.eventSvc.getAll().subscribe(
      (response) => {
        this.events = response['_embedded'].events;
      }
    );

    this.venueSvc.getAll().subscribe(
      (response) => {
        this.venues = response['_embedded'].venues;
      }
    );
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

  buildObject(formData) {
    return {
      title: formData.title,
      description: formData.description,
      isActive: formData.isActive,
      isVisible: formData.isVisible,
      venueId: formData.venueId,
    };
  }

  onRedirect(event: any) {
    const eventId = event._links.self.href.replace(/[\D8080]/g, '');
    this.router.navigate(['/event', eventId]);
  }
}
