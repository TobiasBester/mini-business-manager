import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Stock } from './stockObject';
import { Injectable } from '@angular/core';

/*
  Generated class for the StockListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StockListProvider {

  private stockCollection: AngularFirestoreCollection<Stock>;

  constructor(public db: AngularFirestore) {
    this.stockCollection = db.collection<Stock>('stock', ref => ref.orderBy('name'));
  }

  public addStock(s: Stock) {
    const id = this.db.createId();
    s.id = id;

    return new Promise<any>((resolve, reject) => {
      this.stockCollection.doc(id).set(s)
      .then((response) => {
        console.log('Stock List: Add Stock Response\n' + response);
        resolve(response);
      },
      (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  public sortBy(attribute: string) {
    this.stockCollection = this.db.collection<Stock>('stock', ref => ref.orderBy(attribute));
    // this.stockItemsData = this.stockCollection.valueChanges();
  }

  public getStockListData() {
    return this.stockCollection.valueChanges();
  }

  public getIngredients() {
    return this.stockCollection.valueChanges();
  }

  public removeStock(stock) {
    return new Promise<any>((resolve, reject) => {
      this.stockCollection.doc<Stock>(stock.id).delete()
      .then((response) => {
        console.log('Stock Provider: Delete response\n' + response);
        resolve(response);
      },
      (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  public editAttribute(stock) {
    return new Promise<any>((resolve, reject) => {
        this.stockCollection.doc<Stock>(stock.id).update(stock)
        .then((response) => {
            console.log('Stock Provider: Edited Attribute\n' + response);
            resolve(response);
        },
        (error) => {
            console.log(error);
            reject(error);
        });
    })
  }

}
