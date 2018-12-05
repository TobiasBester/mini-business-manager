import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderListProvider } from '../order-list';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { ClientListProvider } from '../../clients/clientList';
import { DishListProvider } from '../../dishes/dish-list';
import { OrderItem } from '../orderItemObject';
import { Order } from '../orderObject';
import { Client } from '../../clients/clientObject';

/**
 * Generated class for the AddOrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-order',
  templateUrl: 'add-order.html',
})
export class AddOrderPage {

  public addOrderForm: FormGroup;
  public clientData: Observable<any[]>;
  public clientProviderSub: Subscription;
  public dishData: Observable<any[]>;
  public dishProviderSub: Subscription;
  public allOrderItems: OrderItem[] = [];
  private totalCost: number = 0.0;
  public clientLoader = this.lc.create({
    content: 'Getting data...',
    spinner: 'crescent'
  });
  public loader = this.lc.create({
    content: 'Recording order...',
    spinner: 'crescent'
  });
  public clientFailureToast = this.tc.create({
    message: 'Failed to get list of clients. Please try again',
    duration: 2000
  });
  public dishFailureToast = this.tc.create({
    message: 'Failed to get list of dishes. Please try again',
    duration: 2000
  });
  public successToast = this.tc.create({
    message: 'Successfully recorded order!',
    duration: 2000
  });
  public failureToast = this.tc.create({
    message: 'Failed to record order. Please try again.',
    duration: 2000
  });

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public lc: LoadingController,
    public tc: ToastController,
    private fb: FormBuilder,
    public ol: OrderListProvider,
    public cl: ClientListProvider,
    public dl: DishListProvider) {

      this.addOrderForm = this.fb.group({
        client: new FormControl('', Validators.compose([
          Validators.minLength(2),
          Validators.required
        ])),
        dateDue: new FormControl('', Validators.compose([
          Validators.minLength(4),
          Validators.required
        ])),
        timeDue: new FormControl('', Validators.compose([
          Validators.minLength(4),
          Validators.required
        ])),
        dishes: new FormControl('', Validators.compose([
          Validators.minLength(2)
        ])),
        quantity: new FormControl('', Validators.compose([
          Validators.min(1),
          Validators.max(100)
        ])),
        notes: new FormControl()
      });
  }

  ionViewDidLoad() {
    this.clientLoader.present();

    this.dishData = this.dl.getDishesForOrders();
    this.dishProviderSub = this.dishData.subscribe((data) => {
      // console.log(data);
    }, (error) => {
      console.log(error);
      this.dishFailureToast.present();
    });

    this.clientData = this.cl.getClientsForOrders();
    this.clientProviderSub = this.clientData.subscribe((data) => {
      this.clientLoader.dismiss();
    }, (error) => {
      console.log(error);
      this.clientFailureToast.present();
    });
  }

  ionViewWillLeave() {
    this.clientProviderSub.unsubscribe();
    this.dishProviderSub.unsubscribe();
  }

  addOrderItem() {
    const newOrderItem: OrderItem = {
      dish: this.addOrderForm.controls['dishes'].value,
      quantity: this.addOrderForm.controls['quantity'].value
    }

    this.allOrderItems.push(newOrderItem);
    this.addOrderForm.controls['dishes'].reset();
    this.addOrderForm.controls['quantity'].reset();
  }

  orderItemsAreValid() {
    if (this.addOrderForm.controls['dishes'].valid && this.addOrderForm.controls['quantity'].valid) {
      return true;
    };
    return false;
  }

  entireOrderIsValid() {
    if (this.addOrderForm.controls['client'].invalid) {
      return false;
    }
    if (this.addOrderForm.controls['dateDue'].invalid) {
      return false;
    }
    if (this.addOrderForm.controls['timeDue'].invalid) {
      return false;
    }
    if (this.allOrderItems.length <= 0) {
      return false;
    }

    return true;
  }

  formatPrice(inPrice: number) {
    const strPrice: string = (inPrice * 1).toFixed(2);
    return Number(strPrice);
  }

  getOrderTotal() {
    let total: number = 0.0;

    if (this.allOrderItems.length == 0) {
      return this.formatPrice(total);
    }

    this.allOrderItems.forEach((i) => {
      total += i.quantity * i.dish.price;
    });

    this.totalCost = this.formatPrice(total);

    return this.totalCost;
  }

  submitNewOrderForm() {
    console.log('Form Valid!');
    this.loader.present();

    const newOrder: Order = {
      id: 'default',
      completed: false,
      datePlaced: this.getToday(),
      dateCompleted: this.getToday(),
      dateDue: this.addOrderForm.controls['dateDue'].value,
      timeDue: this.addOrderForm.controls['timeDue'].value,
      client: this.addOrderForm.controls['client'].value,
      orderItems: this.allOrderItems,
      totalCost: this.totalCost,
      notes: this.addOrderForm.controls['notes'].value
    };

    this.updateClientDetails(newOrder.client);

    this.ol.addOrder(newOrder)
      .then((response) => {
        this.loader.dismiss();
        this.successToast.present();
        this.addOrderForm.reset();
        this.allOrderItems = [];
        this.totalCost = 0.0;
      }, (error) => {
        console.error(error);
        this.failureToast.present();
        this.loader.dismiss();
      });
  }

  updateClientDetails(client: Client) {
    client.numCurrentOrders++;
    this.cl.editAttribute(client);
  }

  getToday(): Date {
    return new Date();
  }

}
