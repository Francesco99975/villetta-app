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
  homeDeliveryCost: number;
  isLoading: boolean;

  form: FormGroup;
  formError: boolean;
  error: string[];
  errorAlert: string;

  constructor(
    private cartService: CartService, 
    private settings: SettingsService, 
    private stripeService: StripeService,
    private payment: PaymentService,
    private router: Router) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.error = [
      'Firstname must not be empty!',
      'Lastname must not be empty!',
      'Address must not be empty!',
      'Email must not be empty and formatted correctly',
      'Phone number must not be empty!'
    ];
    this.formError = false;
    this.errorAlert = null;
    this.cart = this.cartService.get();
    this.homeDelivery = this.settings.get().homeDelivery;
    this.homeDeliveryCost = this.settings.get().homeDeliveryCost;
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

  get tip(): number {
    return (this.cart.total * (+this.form.get('tip').value / 100 + 1)) - this.cart.total;
  }

  get hst(): number {
    return this.cart.total * 1.13 - this.cart.total;
  }

  get total(): number {
    return this.cart.total + this.tip + this.hst + (this.form.get('pickup').value === 'p' ? 0 : +this.homeDeliveryCost);
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

  onDismissed() {
    this.errorAlert = null;
  }

  onSubmit() {
    if(this.form.valid) {
      this.isLoading = true;
      const name = this.form.get('firstname').value + ' ' + this.form.get('lastname').value;
      try {
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
              homeDeliveryCost: this.settings.get().homeDeliveryCost,
              orderPreparationTime: this.settings.get().orderPreparationTime,
              quantity: this.cart.quantity, 
              uniqueQuantity: this.cart.uniqueQuantity,
              total: this.cart.total,
              tokenId: res.token.id
            }).subscribe((res: any) => {
              console.log(res);
              this.cartService.clearCart().subscribe(() => {
                this.router.navigateByUrl('/success', {replaceUrl: true, state: {eta: res.eta, pickup: res.pickup}});
              });
            }, (err: any) => {
              // Server Handled Errors
              console.log(err.error.message);
              this.router.navigateByUrl('/failed', {replaceUrl: true, state: {error: err.error.message}});
            });
          } else {
            // Card Errors
            console.log('Stripe Token Error');
            this.isLoading = false;
            this.errorAlert = 'Your Card information could be wrong or invalid';
          }
        });
      } catch (error) {
        // Unknown Errors
        console.log(error.message);
        this.isLoading = false;
        this.errorAlert = error.message;
      }
    } else {
      // Form Erros
      this.formError = true;
    }
  }

}
