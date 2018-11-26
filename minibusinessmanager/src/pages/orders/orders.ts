import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { AddOrderPage } from './add-order/add-order';
import { OrderListProvider } from './order-list';
import { Observable } from 'rxjs';
import { SingleOrderPage } from '../orders/single-order/single-order';

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

  orders: Observable<any[]>;
  currentOrders: Observable<any[]>;
  numOrders = 0;
  numCurrentOrders = 0;
  loader = this.lc.create({
    content: 'Fetching list of orders',
    spinner: 'crescent'
  });
  failedToLoadToast = this.tc.create({
    message: 'Failed to fetch orders. Please try again.',
    duration: 2000
  });

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public lc: LoadingController,
    public alertCtrl: AlertController,
    public ol: OrderListProvider,
    public tc: ToastController
    ) {
  }

  ionViewDidLoad() {
    console.log('Orders did load');
    this.loader.present();
    this.orders = this.ol.getOrderListData();
    this.currentOrders = this.ol.getCurrentOrdersList();
    this.currentOrders.subscribe((data) => {
      this.numCurrentOrders = data.length;
    });
    this.orders.subscribe((data) => {
      this.numOrders = data.length;
      this.loader.dismiss();
    }, (error) => {
      console.log('Error: ' + error);
      this.failedToLoadToast.present();
      this.navCtrl.pop();
    });
  }

  sortList() {
    let sortAlert = this.alertCtrl.create({
      title: 'Sort list of orders',
      subTitle: 'Select which attribute to sort by',
      inputs: [
        {
          type: 'radio',
          label: 'Date Placed',
          value: 'datePlaced'
        },
        {
          type: 'radio',
          label: 'Date Completed',
          value: 'dateCompleted'
        },
        {
          type: 'radio',
          label: 'Client Name',
          value: 'client'
        },
        {
          type: 'radio',
          label: 'Total Cost',
          value: 'totalCost'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Sort By',
          handler: (data) => {
            this.ol.sortBy(data);
            this.orders = this.ol.getOrderListData();
          }
        }
      ]
    });
    sortAlert.present();
  }

  goToAddOrder() {
    this.navCtrl.push(AddOrderPage);
  }

  goToOrderPage(selectedOrder) {
    this.navCtrl.push(SingleOrderPage, { order: selectedOrder });
  }

}
