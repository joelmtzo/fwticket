import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EventsComponent} from './events/events.component';
import {ContactoComponent} from './contacto/contacto.component';
import {EventDetailComponent} from './event-detail/event-detail.component';
import {ShoppingCartComponent} from './shopping-cart/shopping-cart.component';
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {
    path: "", component: EventsComponent,
  },
  {
    path: "event/:id", component: EventDetailComponent,
  },
  {
    path: "cart", component: ShoppingCartComponent
  },
  {
    path: "login", component: LoginComponent
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
