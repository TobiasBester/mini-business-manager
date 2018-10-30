import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AddOrderPage } from './add-order/add-order';

/**
 * Generated class for the OrdersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }

  goToAddOrder() {
    this.navCtrl.push(AddOrderPage);
  }

}
