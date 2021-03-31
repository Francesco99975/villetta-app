import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/cart.service';
import { Cart } from '../shared/models/cart.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  cart: Cart;
  sub: Subscription;

  form: FormGroup;
  error: string;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.get();
    this.sub = this.cartService.onChange.subscribe((newCart: Cart) => {
      this.cart = newCart;
    });
    
    this.form = new FormGroup({
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      pickup: new FormControl('p', Validators.required),
      tip: new FormControl('5', Validators.required)
    });

    document.body.style.backgroundColor = "#083995"
  }

  ngOnDestroy(): void {
    document.body.style.backgroundColor = "white"
    this.sub.unsubscribe();
  }

  onBack() {
    this.router.navigateByUrl('/order');
  }

  onRemove(index: number) {
    this.cartService.removeFromCart(this.cart.items[index].product.id).subscribe(() => {
      console.log("Item removed");
    });
  }

  onClear() {
    this.cartService.clearCart().subscribe(() => {
      console.log("Cart Cleared");
    });
  }

  onSubmit() {
    if(this.form.valid) {
      console.log(this.form.value);
    } else {
      this.error = 'Invalid Field';
    }
  }

}
