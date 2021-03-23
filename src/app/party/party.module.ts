import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PartyRoutingModule } from './party-routing.module';
import { PartyComponent } from './party.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [PartyComponent],
  imports: [
    RouterModule,
    PartyRoutingModule,
    SharedModule
  ]
})
export class PartyModule { }