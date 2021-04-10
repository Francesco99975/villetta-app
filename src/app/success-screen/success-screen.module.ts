import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuccessScreenRoutingModule } from './success-screen-routing.module';
import { SuccessScreenComponent } from './success-screen.component';


@NgModule({
  declarations: [SuccessScreenComponent],
  imports: [
    CommonModule,
    SuccessScreenRoutingModule
  ]
})
export class SuccessScreenModule { }