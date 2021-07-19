import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Cart, Item } from './models/cart.model';
import { tap } from 'rxjs/operators';
import { DishesService } from './dishes.service';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Cart;

  onChange: Subject<Cart> = new Subject();

  constructor(private http: HttpClient, private dishes: DishesService) {}

  set(cart: Cart) {
    this.cart = cart;
  }

  get() {
    return this.cart;
  }

  addToCart(id: number, quantity: number) {
    return this.http.post(`${environment.DB_API_URL}/add-to-bag/${id}`, {quantity}, {withCredentials: true})
      .pipe(
        tap(() => this.cart.add(
              new Item({
              product: this.dishes.getDishById(id),
              quantity: quantity
            })
          )
        ),
        tap(() => this.onChange.next(this.cart))
      );
  }

  removeFromCart(id: number) {
    return this.http.delete(`${environment.DB_API_URL}/remove-from-bag/${id}`, {withCredentials: true})
    .pipe(
      tap(() => this.cart.remove(id)),
      tap(() => this.onChange.next(this.cart))
    );
  }

  removeOneFromCart(id: number) {
    return this.http.delete(`${environment.DB_API_URL}/remove-one-from-bag/${id}`, {withCredentials: true})
    .pipe(
      tap(() => this.cart.removeOne(id)),
      tap(() => this.onChange.next(this.cart))
    );
  }

  clearCart() {
    return this.http.get(`${environment.DB_API_URL}/clear-bag`, {withCredentials: true})
    .pipe(
      tap(() => this.cart.clear()),
      tap(() => this.onChange.next(this.cart))
    );
  }
}
