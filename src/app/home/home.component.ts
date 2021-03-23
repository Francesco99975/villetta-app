import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
