import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap, map } from "rxjs/operators";

import { Cart, Item } from "./models/cart.model";
import { CartService } from "./cart.service";
import { DishesService } from './dishes.service';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService {

  constructor(private http: HttpClient, private cartService: CartService, private dishesService: DishesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.cartService.get() == null) {
      return this.http.get("http://127.0.0.1:8000/cart-items").pipe(
        map((res: any) => {
          return {
            'cart': JSON.parse(res['cart']),
            'items': JSON.parse(res['items']),
            'quantity': res['quantity'],
            'unique_quantity': res['unique_quantity'],
            'total': res['total']
          }
        }),
        map((cartData: any) => {
          let cartItems: Item[] = [];
          cartData['cart'].forEach((data: any) => {
            cartItems.push(new Item({
              product: this.dishesService.getDishById(data['product_pk']),
              quantity: data['quantity']
            }));
          });

          return new Cart({
            items: cartItems,
            quantity: cartData['quantity'],
            uniqueQuantity: cartData['unique_quantity'],
            total: cartData['total']
          });
        }),
        tap((newCart: Cart) => this.cartService.set(newCart))
      );
    }
  }
}
