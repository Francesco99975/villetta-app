import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Dish } from './models/dish.model';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  onChange: Subject<Dish[]> = new Subject();

  private dishes: Dish[] = [];

  constructor() { }

  setDishes(dishes: Dish[]) {
    this.dishes = dishes;
    this.onChange.next(this.dishes.slice());
  }

  getDishes() {
    return this.dishes.slice();
  }
}
