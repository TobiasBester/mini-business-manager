import { Injectable } from '@angular/core';
import { PurchaseListProvider } from './purchase-list';
import { StockListProvider } from '../stock/stock-list';
import { Stock } from '../stock/stockObject';
import { Observable, Subscription } from 'rxjs';
import { Purchase } from './purchaseObject';

/*
  Generated class for the AddPurchaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AddPurchaseProvider {

  public stockList: Observable<Stock[]>;
  public stockProviderSub: Subscription;

  constructor(public pl: PurchaseListProvider, public sl: StockListProvider) {
    this.stockList = sl.getStockListData();
  }

  addPurchase(p: Purchase) {
    this.updateStockItem(p.item, p.amount);
    return this.pl.addPurchase(p);
  }

  updateStockItem(s: Stock, amount: number) {
    s.quantity += (amount * 1.0);
    this.sl.editAttribute(s);
  }

}
