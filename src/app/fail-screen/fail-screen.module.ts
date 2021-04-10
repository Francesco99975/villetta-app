import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FailScreenRoutingModule } from './fail-screen-routing.module';
import { FailScreenComponent } from './fail-screen.component';


@NgModule({
  declarations: [FailScreenComponent],
  imports: [
    CommonModule,
    FailScreenRoutingModule
  ]
})
export class FailScreenModule { }