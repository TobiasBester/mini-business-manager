import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AddDishPage } from './add-dish/add-dish';
import { Observable } from 'rxjs';
import { DishListProvider } from './dish-list';

/**
 * Generated class for the DishesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dishes',
  templateUrl: 'dishes.html',
})
export class DishesPage {
  dishes: Observable<any[]>;
  numDishes = 0;
  loader = this.lc.create({
    content: 'Fetching list of dishes',
    spinner: 'crescent'
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public lc: LoadingController, public dl: DishListProvider) {
  }

  ionViewDidLoad() {
    console.log('Dishes did load');
    this.loader.present();
    this.dishes = this.dl.getDishListData();
    this.dishes.subscribe((data) => {
      this.numDishes = data.length;
      this.loader.dismiss();
    }, (error) => {
      console.log('Error: ' + error);
    });
  }

  goToAddDishes() {
    this.navCtrl.push(AddDishPage);
  }

}
