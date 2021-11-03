import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DishesService } from '../shared/dishes.service';
import { Dish } from '../shared/models/dish.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit, OnDestroy {
  sub: Subscription;

  dishes: Dish[] = [];

  constructor(private dishesService: DishesService) { }

  ngOnInit(): void {
    this.dishes = this.dishesService.getDishes();
    this.sub = this.dishesService.onChange.subscribe(dhs => this.dishes = dhs);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  // get specials(): Dish[] {
  //   return this.dishes.filter((dhs: Dish) => dhs.isSpecial);
  // }

  get antipasti(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'A');
  }

  get primi(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'P');
  }

  get secondi(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'S');
  }

  get aperitivi(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'R');
  }

  get pizze(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'Z');
  }

  get salads(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'I');
  }

  get desserts(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'D');
  }

  get beverages(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'B');
  }

  get regQty(): number {
    return this.dishes.length
  };
}
