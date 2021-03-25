import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap, map } from "rxjs/operators";
import { Dish } from "./models/dish.model";
import { DishesService } from "./dishes.service";

@Injectable({
  providedIn: 'root'
})
export class DishesResolverService {

  constructor(private http: HttpClient, private dishes: DishesService) { }
  
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.dishes.getDishes().length <= 0) {
        return this.http.get("http://127.0.0.1:8000/items").pipe(
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
          tap((dishes: Dish[]) => this.dishes.setDishes(dishes))
        );
      }
    }

}
