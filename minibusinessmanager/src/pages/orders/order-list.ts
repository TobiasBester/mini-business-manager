import { Injectable } from '@angular/core';
import { Order } from './orderObject';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

/*
  Generated class for the OrderListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrderListProvider {

  private listOfOrders: Order[] = [];
  private orderCollection: AngularFirestoreCollection<Order>;
  private ordersData: Observable<Order[]>;

  constructor(public db: AngularFirestore) {
    this.orderCollection = db.collection<Order>('orders', ref => ref.orderBy('dateCompleted'));
    this.ordersData = this.orderCollection.valueChanges();
  }

  public addOrder(o: Order) {
    const id = this.db.createId();
    o.id = id;
    this.listOfOrders.push(o);

    return new Promise<any>((resolve, reject) => {
      this.orderCollection.doc(id).set(o)
      .then((response) => {
        console.log('Order List: Add Order\n' + response);
        resolve(response);
      },
      (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  public sortBy(attribute: string) {
    this.orderCollection = this.db.collection<Order>('orders', ref => ref.orderBy(attribute));
    this.ordersData = this.orderCollection.valueChanges();
  }

  public getOrderListData() {
    return this.ordersData;
  }

  public removeOrder(order) {
    return new Promise<any>((resolve, reject) => {
      this.orderCollection.doc<Order>(order.id).delete()
      .then((response) => {
        resolve(response);
      },
      (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

}
