import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { StockListProvider } from '../stock-list';
import { Stock } from '../stockObject';

/**
 * Generated class for the SingleStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-stock',
  templateUrl: 'single-stock.html',
})
export class SingleStockPage {

  public stockItem: Stock;
  public quantity: number;
  public tempQuantity: number;
  public successToast = this.toastController.create({
    message: 'Successfully updated quantity',
    duration: 2000
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastController: ToastController,
    public sl: StockListProvider, public alertCtrl: AlertController) {
      this.stockItem = navParams.get('stock');
      this.quantity = this.stockItem.quantity;
      this.tempQuantity = this.stockItem.quantity;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleStockPage');
  }

  decQ() {
    this.tempQuantity = (this.tempQuantity*1) - 1;
  }

  incQ() {
    this.tempQuantity = (this.tempQuantity*1) + 1;
  }

  noChanges() {
    if (this.tempQuantity == this.quantity) {
      return true;
    } else return false;
  }

  confirmChanges() {
    this.quantity = this.tempQuantity;
    this.stockItem.quantity = this.quantity;
    this.sl.editAttribute(this.stockItem);
  }

}
