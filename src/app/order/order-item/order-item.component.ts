import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/shared/cart.service';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent implements OnInit {
  @Input() id: number;
  @Input() name: string;
  @Input() description: string;
  @Input() imageUrl: string;
  @Input() price: number;
  @Input() divider: boolean;

  itemQuantity: number;

  constructor(private cart: CartService) { }

  ngOnInit(): void {
    this.itemQuantity = 1;
  }

  increment() {
    if(this.itemQuantity < 25) {
      this.itemQuantity++;
    }
  }

  decrement() {
    if(this.itemQuantity > 1) {
      this.itemQuantity--;
    }
  }

  addToBag() {
    this.cart.addToCart(this.id, this.itemQuantity).subscribe(() => console.log("Item added"));
  }

}
