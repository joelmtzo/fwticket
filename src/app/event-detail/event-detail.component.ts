import {Component, OnInit} from '@angular/core';
import {EventsService} from '../services/events.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: any;
  eventId: any;

  constructor(private eventSvc: EventsService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.eventId = params['id']);

    this.eventSvc.getById(this.eventId)
      .subscribe(response => this.event = response);
  }

}
