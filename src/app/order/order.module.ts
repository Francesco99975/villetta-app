import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [OrderComponent, OrderItemComponent],
  imports: [
    RouterModule,
    OrderRoutingModule,
    SharedModule
  ]
})
export class OrderModule { }