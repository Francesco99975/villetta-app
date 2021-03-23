import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() imagePath: string;
  @Input() price: number;
  @Input() divider: boolean;

  itemQuantity: number;

  constructor() { }

  ngOnInit(): void {
    this.itemQuantity = 1;
  }

  increment() {
    if(this.itemQuantity <= 25) {
      this.itemQuantity++;
    }
  }

  decrement() {
    if(this.itemQuantity > 1) {
      this.itemQuantity--;
    }
  }

  addToBag() {

  }

}
