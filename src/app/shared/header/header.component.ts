import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { Cart } from '../models/cart.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  sub: Subscription;

  @Input() checkout: boolean;
  cartQuantity: number;

  constructor(private router: Router, private cart: CartService) { }

  ngOnInit(): void {
    if(this.cart.get() != null) {
      this.cartQuantity = this.cart.get().quantity;
    }
    this.sub = this.cart.onChange.subscribe((newCart: Cart) => {
      this.cartQuantity = newCart.quantity;
    });
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
