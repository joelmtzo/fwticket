import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventsComponent} from './components/events/events.component';
import {ContactoComponent} from './components/contacto/contacto.component';
import {EventDetailComponent} from './components/event-detail/event-detail.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {LoginComponent} from './components/login/login.component';
import {ProfileComponent} from './components/profile/profile.component';

const routes: Routes = [
  {
    path: '', component: EventsComponent,
  },
  {
    path: 'event/:id', component: EventDetailComponent,
  },
  {
    path: 'cart', component: ShoppingCartComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'profile', component: ProfileComponent
  },
  {
    path: 'contact', component: ContactoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
