import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input() name: string;
  @Input() description: string;
  @Input() imageUrl: string;
  @Input() price: number;
  @Input() divider: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
