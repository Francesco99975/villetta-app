 
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MenuItemComponent } from "./menu-item/menu-item.component";
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [HomeComponent, MenuItemComponent],
  imports: [
    RouterModule,
    HomeRoutingModule,
    SharedModule
  ]
})
export class HomeModule { }