import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { DishesResolverService } from './shared/dishes-resolver.service';
import { SettingsResolverService } from './shared/settings-resolver.service';

const routes: Routes = [
  {
    path: "", redirectTo: "/home", pathMatch: "full",
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
    resolve: [DishesResolverService, SettingsResolverService]
  },
  {
    path: "party",
    loadChildren: () => import("./party/party.module").then((m) => m.PartyModule),
    resolve: [DishesResolverService, SettingsResolverService]
  },
  {
    path: "order",
    loadChildren: () => import("./order/order.module").then((m) => m.OrderModule),
    resolve: [DishesResolverService, SettingsResolverService]
  },
  {
    path: "checkout",
    loadChildren: () => import("./checkout/checkout.module").then((m) => m.CheckoutModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
