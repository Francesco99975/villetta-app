import { Dish } from "./dish.model";

export class Item {
    product: Dish;
    quantity: number;

    constructor({product, quantity}) {
        this.product = product;
        this.quantity = quantity;
    }

    get subtotal(): number {
        return this.product.price * this.quantity;
    }
}

export class Cart {
    items: Item[];
    quantity: number;
    uniqueQuantity: number;
    total: number;

    constructor({items, quantity, uniqueQuantity, total}) {
        this.items = items;
        this.quantity = quantity;
        this.uniqueQuantity = uniqueQuantity;
        this.total = total;
    }
}