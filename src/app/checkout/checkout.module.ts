import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '../shared/shared.module';
import { NgxStripeModule } from "ngx-stripe";
import { environment } from "../../environments/environment";


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CheckoutRoutingModule,
    SharedModule,
    NgxStripeModule.forRoot(environment.STRIPE_PUBLIC_API_KEY)
  ]
})
export class CheckoutModule { }