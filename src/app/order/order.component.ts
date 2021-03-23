import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  specials: any[] = [];
  antipasti: any[] = [];
  primi: any[] = [];
  secondi: any[] = [];
  pizze: any[] = [];
  desserts: any[] = [];
  beverages: any[] = [];

  regQty: number;

  constructor() { }

  ngOnInit(): void {
  }

}
