import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { Cart } from '../models/cart.model';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  sub: Subscription;

  @Input() checkout: boolean;
  cartQuantity: number;
  ordersOn: boolean;

  constructor(private router: Router, private cart: CartService, private settingsService: SettingsService) { }

  ngOnInit(): void {
    if(this.cart.get() != null) {
      this.cartQuantity = this.cart.get().quantity;
    }
    this.sub = this.cart.onChange.subscribe((newCart: Cart) => {
      this.cartQuantity = newCart.quantity;
    });
    this.ordersOn = this.settingsService.get().ordersAvailable;
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onOpenNav() {
    document.querySelector('.backdrop').classList.add('open');
    document.querySelector('.mobile-nav').classList.add('open');
  }

  onCloseNav() {
    document.querySelector('.mobile-nav').classList.remove('open');
    document.querySelector('.backdrop').classList.remove('open');
  }

  onOrder() {
    this.router.navigateByUrl('/order');
  }

  onCheckout() {
    this.router.navigateByUrl('/checkout');
  }

}
