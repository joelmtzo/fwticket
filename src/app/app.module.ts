import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {EventsComponent} from './components/events/events.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {EventDetailComponent} from './components/event-detail/event-detail.component';
import {ContactoComponent} from './components/contacto/contacto.component';
import {ShoppingCartComponent} from './components/shopping-cart/shopping-cart.component';
import {LoginComponent} from './components/login/login.component';
import {JwtModule} from '@auth0/angular-jwt';
import {environment} from '../environments/environment';
import {TokenAuthInterceptor} from './interceptors/token-auth.service';
import { ProfileComponent } from './components/profile/profile.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrdersComponent } from './components/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    EventsComponent,
    EventDetailComponent,
    ContactoComponent,
    ShoppingCartComponent,
    LoginComponent,
    ProfileComponent,
    OrderDetailComponent,
    OrdersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: [environment.apiUrl]
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenAuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
