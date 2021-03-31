import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CheckoutRoutingModule,
    SharedModule
  ]
})
export class CheckoutModule { }