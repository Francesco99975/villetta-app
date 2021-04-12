import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CartResolverService } from './shared/cart-resolver.service';
import { DishesResolverService } from './shared/dishes-resolver.service';
import { SettingsResolverService } from './shared/settings-resolver.service';
import { UnavailableComponent } from './unavailable/unavailable.component';

const routes: Routes = [
  {
    path: "", redirectTo: "/home", pathMatch: "full"
  },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then((m) => m.HomeModule),
    resolve: [DishesResolverService, SettingsResolverService],
  },
  {
    path: "party",
    loadChildren: () => import("./party/party.module").then((m) => m.PartyModule),
    resolve: [DishesResolverService, SettingsResolverService],
  },
  {
    path: "order",
    loadChildren: () => import("./order/order.module").then((m) => m.OrderModule),
    resolve: [CartResolverService, SettingsResolverService]
  },
  {
    path: "checkout",
    loadChildren: () => import("./checkout/checkout.module").then((m) => m.CheckoutModule),
    resolve: [CartResolverService, SettingsResolverService]
  },
  {
    path: "failed",
    loadChildren: () => import("./fail-screen/fail-screen.module").then(m => m.FailScreenModule),
    resolve: [SettingsResolverService]
  },
  {
    path: "success",
    loadChildren: () => import("./success-screen/success-screen.module").then(m => m.SuccessScreenModule),
    resolve: [SettingsResolverService]
  },
  {
    path: "unavailable",
    component: UnavailableComponent
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
