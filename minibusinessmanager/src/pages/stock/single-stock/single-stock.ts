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
  public deleteToast = this.toastController.create({
    message: 'Successfully removed stock item',
    duration: 2000
  });
  public deleteFailToast = this.toastController.create({
    message: 'Failed to remove stock item. Please try again',
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

  removeStockItem() {
    let confirmAlert = this.alertCtrl.create({
      title: 'Remove Stock Item',
      subTitle: 'Are you sure you want to remove this stock item?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.sl.removeStock(this.stockItem)
            .then((response)=> {
              console.log('Removed dish');
              this.deleteToast.present();
              this.navCtrl.pop();
            }, 
            (error) => {
              console.log('Did not remove dish');
              console.log(error);
              this.deleteFailToast.onDidDismiss(() => {
                this.deleteFailToast.present();
              });
            });
          }
        }
      ]
    });
    confirmAlert.present();
  }

}
