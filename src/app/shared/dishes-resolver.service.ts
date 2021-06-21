import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { tap, map } from "rxjs/operators";
import { Dish } from "./models/dish.model";
import { DishesService } from "./dishes.service";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class DishesResolverService {

  constructor(private http: HttpClient, private dishes: DishesService) { }
  
  
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.dishes.getDishes().length <= 0) {
        return this.http.get(`${environment.DB_API_URL}/items`, {withCredentials: true}).pipe(
          map((items: any) => {
            return items['dishes'].map((itm: any) => {
              return new Dish({
                id: itm['pk'],
                name: itm['fields']['name'],
                description: itm['fields']['description'],
                price: itm['fields']['price'],
                // imageUrl: `${environment.DB_API_URL}/media/` + itm['fields']['image'],
                courseType: itm['fields']['course_type']
              });
            });
          }),
          tap((dishes: Dish[]) => this.dishes.setDishes(dishes))
        );
      }
    }

}
