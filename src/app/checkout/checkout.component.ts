import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { Subscription } from 'rxjs';
import { CartService } from '../shared/cart.service';
import { Cart } from '../shared/models/cart.model';
import { SettingsService } from '../shared/settings.service';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    hidePostalCode: true,
    style: {
      base: {
        iconColor: '#0000FF',
        color: '#083995',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#353535'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en-CA'
  };

  cart: Cart;
  sub: Subscription;
  homeDelivery: boolean;

  form: FormGroup;
  error: string;

  constructor(
    private cartService: CartService, 
    private settings: SettingsService, 
    private stripeService: StripeService,
    private payment: PaymentService,
    private router: Router) { }

  ngOnInit(): void {
    this.cart = this.cartService.get();
    this.homeDelivery = this.settings.get().homeDelivery;
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
      const name = this.form.get('firstname').value + ' ' + this.form.get('lastname').value;
      this.stripeService.createToken(this.card.element, {name}).subscribe((res) => {
        if(res.token) {
          this.payment.getStripeSession({
            items: this.cart.items, 
            firstname: this.form.get('firstname').value,
            lastname: this.form.get('lastname').value,
            email: this.form.get('email').value,
            address: this.form.get('address').value,
            phone: this.form.get('phone').value,
            pickup: this.form.get('pickup').value == 'p' ? true: false,
            tip: this.form.get('tip').value, 
            quantity: this.cart.quantity, 
            uniqueQuantity: this.cart.uniqueQuantity,
            total: this.cart.total,
            tokenId: res.token.id
          }).subscribe((res) => console.log(res));
        } else {
          console.log('Token Error');
        }
      });
    } else {
      this.error = 'Invalid Field';
    }
  }

}
