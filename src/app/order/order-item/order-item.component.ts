import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private cart: CartService, private toaster: ToastrService) { }

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
    this.cart.addToCart(this.id, this.itemQuantity).subscribe((res: any) => {
      console.log("Item added");
      this.toaster.info(res.message, "Item Added to Cart");
      // document.querySelector('.message').innerHTML = res.message;
      // document.querySelector('.messages').classList.add('msg-open');
      // setTimeout(() => document.querySelector('.messages').classList.remove('msg-open'), 3000);
    });
  }

}
