import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AddDishPage } from './add-dish/add-dish';
import { Observable } from 'rxjs';
import { DishListProvider } from './dish-list';
import { SingleDishPage } from './single-dish/single-dish';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public lc: LoadingController, public dl: DishListProvider,
    public alertCtrl: AlertController) {
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

  goToDishPage(selectedDish) {
    this.navCtrl.push(SingleDishPage, { dish: selectedDish });
  }

  sortList() {
    let sortAlert = this.alertCtrl.create({
      title: 'Sort list of dishes',
      subTitle: 'Select which attribute to sort by',
      inputs: [
        {
          type: 'radio',
          label: 'Name',
          value: 'name'
        },{
          type: 'radio',
          label: 'Price',
          value: 'price'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Sort By',
          handler: (data) => {
            this.dl.sortBy(data);
            this.dishes = this.dl.getDishListData();
          }
        }
      ]
    });
    sortAlert.present();
  }

}
