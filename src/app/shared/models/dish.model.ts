export class Dish {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl?: string;
    courseType: string;
    isSpecial: boolean;

    constructor({id, name, description, price, imageUrl = null, courseType, isSpecial}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imageUrl = imageUrl;
        this.courseType = courseType;
        this.isSpecial = isSpecial;
    }
}