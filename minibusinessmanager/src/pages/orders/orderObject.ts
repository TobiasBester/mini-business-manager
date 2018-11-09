import { Client } from "../clients/clientObject";
import { OrderItem } from "./orderItemObject";

export interface Order {
    id: string;
    completed: boolean;
    datePlaced: Date;
    dateCompleted: Date;
    dateDue: Date;
    timeDue: Date;
    client: Client;
    orderItems: OrderItem[];
    totalCost: Number;
    notes: String;
}