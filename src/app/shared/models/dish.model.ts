export class Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    courseType: string;

    constructor({id, name, description, price, courseType}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.courseType = courseType;
    }
}