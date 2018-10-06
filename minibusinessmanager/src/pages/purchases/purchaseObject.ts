import { Stock } from "../stock/stockObject";

export interface Purchase {
    id: string;
    // Type could be stock or something else
    type: string;
    item: Stock;
    amount: number;
    totalCost: number;
    date: Date;
}