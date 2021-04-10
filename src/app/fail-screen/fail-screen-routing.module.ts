import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FailScreenComponent } from './fail-screen.component';

const routes: Routes = [{ path: '', component: FailScreenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FailScreenRoutingModule { }