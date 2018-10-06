import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Stock } from './stockObject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*
  Generated class for the StockListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StockListProvider {

  private listOfStockItems: Stock[] = [];
  private stockCollection: AngularFirestoreCollection<Stock>;
  private stockItemsData: Observable<Stock[]>;
  // private ingredients: Observable<Stock[]>;

  constructor(public db: AngularFirestore) {
    this.stockCollection = db.collection<Stock>('stock', ref => ref.orderBy('name'));
    this.stockItemsData = this.stockCollection.valueChanges();
  }

  public addStock(s: Stock) {
    const id = this.db.createId();
    s.id = id;
    this.listOfStockItems.push(s);

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
    this.stockItemsData = this.stockCollection.valueChanges();
  }

  public getStockListData() {
    return this.stockCollection.valueChanges();
  }

  public getIngredients() {
    return this.stockCollection.valueChanges();
  }

  // public removeStock(stock) {
  //   this.removeStockFromArray(stock);

  //   return new Promise<any>((resolve, reject) => {
  //     this.stockCollection.doc<Stock>(stock.id).delete()
  //     .then((response) => {
  //       console.log('Stock Provider: Delete response\n' + response);
  //       resolve(response);
  //     },
  //     (error) => {
  //       console.log(error);
  //       reject(error);
  //     });
  //   });
  // }

  // public removeStockFromArray(stock) {
  //   this.listOfStockItems.forEach((element, index) => {
  //     if (element.id == stock.id) {
  //       this.listOfStockItems.splice(index, 1);
  //       console.log(this.listOfStockItems);
  //     }
  //   });
  // }

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
