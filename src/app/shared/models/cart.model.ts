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

    constructor(items: Item[]) {
        this.items = items;
    }

    get quantity(): number {
        return this.items.reduce((prev: number, item: Item) => item.quantity + prev, 0)
    }

    get uniqueQuantity(): number {
        return this.items.length;
    }

    get total(): number {
        return this.items.reduce((prev: number, item: Item) => item.subtotal + prev, 0.0)
    }

    add(newItem: Item) {
        let index = this.items.findIndex((itm) => itm.product.id == newItem.product.id);
        if(index >= 0) {
            this.items[index].quantity += newItem.quantity;
        } else {
            this.items.push(newItem);
        }
    }

    remove(id: number) {
        const index = this.items.findIndex((itm) => itm.product.id == id);
        this.items.splice(index, 1);
    }

    removeOne(id: number) {
        const index = this.items.findIndex((itm) => itm.product.id == id);
        if(this.items[index].quantity <= 1) {
            this.remove(id);
        } else {
        this.items[index].quantity = this.items[index].quantity - 1;
        }
    }

    clear() {
        this.items = [];
    }
}