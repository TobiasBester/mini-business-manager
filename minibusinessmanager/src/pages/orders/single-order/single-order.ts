import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { OrderListProvider } from '../order-list';
import { Order } from '../orderObject';
import { ClientListProvider } from '../../clients/clientList';

/**
 * Generated class for the SingleOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-order',
  templateUrl: 'single-order.html',
})
export class SingleOrderPage {

  public order: Order;
  // public timeRemaining = 0;

  public deleteSuccessToast = this.tc.create({
    message: 'Successfully removed order',
    duration: 2000
  });
  public deleteFailToast = this.tc.create({
    message: 'Failed to remove order',
    duration: 2000
  });
  public completeSuccessToast = this.tc.create({
    message: 'Order completed',
    duration: 2000
  });

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public tc: ToastController,
    public ol: OrderListProvider,
    public alertCtrl: AlertController,
    public cl: ClientListProvider ) {

      this.order = navParams.get('order');
      // this.timeRemaining = this.getTimeRemaining();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleOrderPage');
  }

  markAsCompleted() {
    this.order.completed = true;
    this.order.dateCompleted = new Date();
    this.ol.editAttribute(this.order).then(() => {
      this.completeSuccessToast.present();
      this.order.client.numCurrentOrders--;
      this.cl.editAttribute(this.order.client);
    }, (error) => {
      //
    });
  }

  removeOrder() {
    let confirmAlert = this.alertCtrl.create({
      title: 'Remove order',
      subTitle: 'Are you sure you want to remove this order?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.ol.removeOrder(this.order)
            .then((response)=> {
              this.deleteSuccessToast.present();
              this.navCtrl.pop();
            },
            (error) => {
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

  // getTimeRemaining() {
  //   const now = new Date();
  //   let sum = this.order.dateDue.valueOf() - now.getTime();
  //   console.log(sum);
  //   return sum/1000;
  // }

}
