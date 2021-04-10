import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuccessScreenComponent } from './success-screen.component';

const routes: Routes = [{ path: '', component: SuccessScreenComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuccessScreenRoutingModule { }