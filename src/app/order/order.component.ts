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

  get specials(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.isSpecial);
  }

  get antipasti(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'A' && !dhs.isSpecial);
  }

  get primi(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'P' && !dhs.isSpecial);
  }

  get secondi(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'S' && !dhs.isSpecial);
  }

  get pizze(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'Z' && !dhs.isSpecial);
  }

  get desserts(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'D' && !dhs.isSpecial);
  }

  get beverages(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'B' && !dhs.isSpecial);
  }

  get regQty(): number {
    return this.dishes.filter((dhs: Dish) => !dhs.isSpecial).length
  };
}
