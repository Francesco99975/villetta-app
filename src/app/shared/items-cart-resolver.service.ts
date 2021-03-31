import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CartService } from './cart.service';
import { DishesService } from './dishes.service';
import { tap, map } from "rxjs/operators";
import { Dish } from "./models/dish.model";
import { HttpClient } from '@angular/common/http';
import { Cart, Item } from './models/cart.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemsCartResolverService {

  constructor(private http: HttpClient, private dishesService: DishesService, private cartService: CartService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.dishesService.getDishes().length <= 0) {
       return this.http.get("http://127.0.0.1:8000/items", {withCredentials: true}).pipe(
        map((items: any) => {
          return items['dishes'].map((itm: any) => {
            return new Dish({
              id: itm['pk'],
              name: itm['fields']['name'],
              description: itm['fields']['description'],
              price: itm['fields']['price'],
              imageUrl: "http://127.0.0.1:8000/media/" + itm['fields']['image'],
              courseType: itm['fields']['course_type'],
              isSpecial: itm['fields']['is_special']
            });
          });
        }),
        tap((dishes: Dish[]) => this.dishesService.setDishes(dishes)),
        tap(() => {
          if(this.cartService.get() == null) {
            return this.http.get("http://127.0.0.1:8000/cart-items", {withCredentials: true}).pipe(
              map((res: any) => {
                return {
                  'cart': JSON.parse(res['cart']),
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
      
                return new Cart(cartItems);
              }),
              tap((newCart: Cart) => this.cartService.set(newCart))
            );
          }
        })
      );
    }
  }
}
