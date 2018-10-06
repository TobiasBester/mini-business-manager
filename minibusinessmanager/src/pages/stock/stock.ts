import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { AddStockPage } from './add-stock/add-stock';
import { StockListProvider } from './stock-list';
import { SingleStockPage } from './single-stock/single-stock';

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
  public failureToast = this.toastController.create({
    message: 'Could not get list of stock items. Please retry later',
    duration: 2000
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public lc: LoadingController,
    public sl: StockListProvider, public toastController: ToastController) {
    this.loader.present();
    this.stockItems = this.sl.getStockListData();
    this.stockItems.subscribe((data) => {
      this.numStockItems = data.length;
      this.loader.dismiss();
    }, (error) => {
      console.log('Error: ' + error);
      this.failureToast.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StockPage');
  }

  goToAddStock() {
    this.navCtrl.push(AddStockPage);
  }

  goToStockPage(selectedStockItem) {
    this.navCtrl.push(SingleStockPage, { stock: selectedStockItem })
  }

}
