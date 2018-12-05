import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { OrderListProvider } from '../orders/order-list';
import { SingleOrderPage } from '../orders/single-order/single-order';
import { AddOrderPage } from '../orders/add-order/add-order';
import { AddClientPage } from '../clients/add-client/add-client';
import { AddDishPage } from '../dishes/add-dish/add-dish';
import { AddStockPage } from '../stock/add-stock/add-stock';
import { RecordPurchasePage } from '../purchases/record-purchase/record-purchase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public currentDate: number;
  currentOrders: Observable<any[]>;
  numCurrentOrders = 0;

  failedToLoadToast = this.tc.create({
    message: 'Failed to fetch current orders. Please try again.',
    duration: 2000
  });

  constructor(
    public navCtrl: NavController,
    public ol: OrderListProvider,
    public tc: ToastController) {
  }

  ionViewDidLoad() {
    this.currentDate = Date.now();
    this.currentOrders = this.ol.getCurrentOrdersList();
    this.currentOrders.subscribe((data) => {
      this.numCurrentOrders = data.length;
    }, (error) => {
      console.log('Error: ' + error);
      this.failedToLoadToast.present();
    });
  }

  goToOrderPage(selectedOrder) {
    this.navCtrl.push(SingleOrderPage, { order: selectedOrder });
  }

  goToPage(page) {
    switch (page) {
      case 'addorder':
        this.navCtrl.push(AddOrderPage);
        break;
      case 'addclient':
        this.navCtrl.push(AddClientPage);
        break;
      case 'adddish':
        this.navCtrl.push(AddDishPage);
        break;
      case 'addstock':
        this.navCtrl.push(AddStockPage);
        break;
      case 'addpurchase':
        this.navCtrl.push(RecordPurchasePage);
        break;

      default:
        break;
    }
  }

}
