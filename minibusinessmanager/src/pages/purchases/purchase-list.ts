import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Purchase } from './purchaseObject';

/*
  Generated class for the PurchaseListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PurchaseListProvider {

  private listOfPurchases: Purchase[] = [];
  private purchaseCollection: AngularFirestoreCollection;
  private purchasesData: any;

  constructor(public db: AngularFirestore) {
    this.purchaseCollection = db.collection<Purchase>('purchases', ref => ref.orderBy('date'));
    this.purchasesData = this.purchaseCollection.valueChanges();
  }

  public addPurchase(p: Purchase) {
    const id = this.db.createId();
    p.id = id;
    this.listOfPurchases.push(p);

    return new Promise<any>((resolve, reject) => {
      this.purchaseCollection.doc(id).set(p)
      .then((response) => {
        resolve(response);
      },
      (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  public sortBy(attribute: string) {
    this.purchaseCollection = this.db.collection<Purchase>('purchases', ref => ref.orderBy(attribute));
    this.purchasesData = this.purchaseCollection.valueChanges();
  }

  public getPurchaseData() {
    return this.purchasesData;
  }

  public getStockPurchases() {
    return this.db.collection<Purchase>('purchases', ref => ref.where('type', '==', 'stock'));
  }

  public removePurchase(purchase) {
    return new Promise<any>((resolve, reject) => {
      this.purchaseCollection.doc<Purchase>(purchase.id).delete()
      .then((response) => {
        resolve(response);
      },
      (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  public editAttribute(purchase) {
    return new Promise<any>((resolve, reject) => {
        this.purchaseCollection.doc<Purchase>(purchase.id).update(purchase)
        .then((response) => {
            resolve(response);
        },
        (error) => {
            console.log(error);
            reject(error);
        });
    })
  }

}
