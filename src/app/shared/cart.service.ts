import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Cart } from './models/cart.model';
import {CookieService} from 'angular2-cookie/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart;

  onChange: Subject<Cart> = new Subject();

  constructor(private http: HttpClient, private cookies: CookieService) { }

  set(cart: Cart) {
    this.cart = cart;
    console.log(this.cart);
  }

  get() {
    return this.cart;
  }

  addToCart(id: number, quantity: number) {
    return this.http.post(`http://127.0.0.1:8000/add-to-bag/${id}`, {quantity}, {
      headers: new HttpHeaders({
        'X-CSRFToken': this.cookies.get('csrftoken')
      })
    });
  }

  removeFromCart(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/remove-from-bag/${id}`);
  }

  
}
