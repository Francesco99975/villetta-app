import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "", redirectTo: "/home", pathMatch: "full",
  },
  {
    path: "/home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule)
  },
  {
    path: "/party",
    loadChildren: () => import("./party/party.module").then((m) => m.PartyModule) 
  },
  {
    path: "/order",
    loadChildren: () => import("./order/order.module").then((m) => m.OrderModule) 
  },
  {
    path: "/checkout",
    loadChildren: () => import("./checkout/checkout.module").then((m) => m.CheckoutModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
