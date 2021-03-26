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
    this.cartQuantity = this.cart.get().quantity;
    this.sub = this.cart.onChange.subscribe((newCart: Cart) => {
      this.cartQuantity = newCart.quantity;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onOrder() {
    this.router.navigateByUrl('/order');
  }

}
