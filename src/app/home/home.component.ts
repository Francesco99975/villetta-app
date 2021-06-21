import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DishesService } from '../shared/dishes.service';
import { Dish } from '../shared/models/dish.model';
import { Settings } from '../shared/models/settings.model';
import { SettingsService } from '../shared/settings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  sub: Subscription;

  dishes: Dish[] = [];
  settings: Settings;
  addressLink: string;

  constructor(private dishesService: DishesService, private settingsService: SettingsService) { }

  ngOnInit(): void {
    this.dishes = this.dishesService.getDishes();
    this.settings = this.settingsService.get();
    this.sub = this.dishesService.onChange.subscribe(dhs => this.dishes = dhs);
    const formattedAddress = this.settings.address.split(' ').join('+');
    this.addressLink = `https://maps.google.com/?q=${formattedAddress}+ON+Canada`;
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

  get pizze(): Dish[] {
    return this.dishes.filter((dhs: Dish) => dhs.courseType === 'Z');
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
