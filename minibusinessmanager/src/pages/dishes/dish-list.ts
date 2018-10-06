import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Dish } from './dishObject';

/*
  Generated class for the DishListProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DishListProvider {

  private listOfDishes: Dish[] = [];
  private dishCollection: AngularFirestoreCollection<Dish>;
  private dishesData: any;

  constructor(public db: AngularFirestore) {
    this.dishCollection = db.collection<Dish>('dishes', ref => ref.orderBy('name'));
    this.dishesData = this.dishCollection.valueChanges();
  }

  public addDish(d: Dish) {
    const id = this.db.createId();
    d.id = id;
    this.listOfDishes.push(d);

    return new Promise<any>((resolve, reject) => {
      this.dishCollection.doc(id).set(d)
      .then((response) => {
        console.log('Dish List: Add Dish Response\n' + response);
        resolve(response);
      },
      (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  public sortBy(attribute: string) {
    this.dishCollection = this.db.collection<Dish>('dishes', ref => ref.orderBy(attribute));
    this.dishesData = this.dishCollection.valueChanges();
  }

  public getDishListData() {
    return this.dishesData;
  }

  public removeDish(dish) {
    return new Promise<any>((resolve, reject) => {
      this.dishCollection.doc<Dish>(dish.id).delete()
      .then((response) => {
        console.log('Dish Provider: Delete Response\n' + response);
        resolve(response);
      },
      (error) => {
        console.log(error);
        reject(error);
      });
    });
  }

  public editAttribute(dish) {
    return new Promise<any>((resolve, reject) => {
        this.dishCollection.doc<Dish>(dish.id).update(dish)
        .then((response) => {
            console.log('Dish Provider: Edited Attribute\n' + response);
            resolve(response);
        },
        (error) => {
            console.log(error);
            reject(error);
        });
    })
  }

}
