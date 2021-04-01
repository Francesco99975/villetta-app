import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap, map } from "rxjs/operators";

import { Cart, Item } from "./models/cart.model";
import { CartService } from "./cart.service";
import { DishesService } from './dishes.service';
import { Dish } from './models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class CartResolverService {

  constructor(private http: HttpClient, private cartService: CartService, private dishesService: DishesService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.cartService.get() == null) {
      return this.http.get("http://127.0.0.1:8000/cart-items", {withCredentials: true}).pipe(
        map((res: any) => {
          return {
            'cart': JSON.parse(res['cart']),
            'dishes': res['dishes'].map((itm: any) => {
              return new Dish({
                id: itm['pk'],
                name: itm['fields']['name'],
                description: itm['fields']['description'],
                price: itm['fields']['price'],
                imageUrl: "http://127.0.0.1:8000/media/" + itm['fields']['image'],
                courseType: itm['fields']['course_type'],
                isSpecial: itm['fields']['is_special']
              });
            })
          }
        }),
        tap((cartData: any) => this.dishesService.setDishes(cartData['dishes'])),
        map((cartData: any) => {
          let cartItems: Item[] = [];
          cartData['cart'].forEach((data: any) => {
            cartItems.push(new Item({
              product: this.dishesService.getDishById(data['product_pk']),
              quantity: data['quantity']
            }));
          });

          return new Cart(cartItems);
        }),
        tap((newCart: Cart) => this.cartService.set(newCart))
      );
    }
  }
}
