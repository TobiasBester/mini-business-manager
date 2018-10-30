import { Client } from "../clients/clientObject";
import { Dish } from "../dishes/dishObject";

export interface Order {
    id: string,
    datePlaced: Date;
    dateCompleted: Date;
    dateDue: Date;
    timeDue: Date;
    client: Client;
    dishes: Dish[];
    totalCost: Number;
    notes: String;
}