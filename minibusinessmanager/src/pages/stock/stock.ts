import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AddStockPage } from './add-stock/add-stock';

/**
 * Generated class for the StockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-stock',
  templateUrl: 'stock.html',
})
export class StockPage {

  stockItems: Observable<any[]>;
  numStockItems = 0;
  loader = this.lc.create({
    content: 'Fetching list of stock items',
    spinner: 'crescent'
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public lc: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockPage');
  }

  goToAddStock() {
    this.navCtrl.push(AddStockPage);
  }

}
