import { Dish } from "../dishes/dishObject";

export interface OrderItem {
    dish: Dish,
    quantity: number
}