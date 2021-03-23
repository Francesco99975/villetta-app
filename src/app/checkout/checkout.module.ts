import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    RouterModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }