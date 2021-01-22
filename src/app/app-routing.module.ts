import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsComponent} from './events/events.component';
import {ContactoComponent} from './contacto/contacto.component';
import {EventDetailComponent} from './event-detail/event-detail.component';

const routes: Routes = [
  {
    path: "", component: EventsComponent,
  },
  {
    path: "event/:id", component: EventDetailComponent,
  },
  {
    path: "cart", component: ContactoComponent
  },
  {
    path: "contact", component: ContactoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
