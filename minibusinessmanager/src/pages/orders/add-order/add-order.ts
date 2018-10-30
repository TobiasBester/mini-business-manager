import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderListProvider } from '../order-list';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { ClientListProvider } from '../../clients/clientList';
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
  public clientLoader = this.lc.create({
    content: 'Getting clients...',
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
  public successToast = this.tc.create({
    message: 'Successfully recorded order!',
    duration: 2000
  });

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public lc: LoadingController,
    public tc: ToastController,
    private fb: FormBuilder,
    public ol: OrderListProvider,
    public cl: ClientListProvider) {

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
        notes: new FormControl()
      })
  }

  ionViewDidLoad() {
    this.clientLoader.present();
    this.clientData = this.cl.getClientsForOrders();
    this.clientProviderSub = this.clientData.subscribe((data) => {
      this.clientLoader.dismiss();
    }, (error) => {
      console.log(error);
      this.clientFailureToast.present();
    });
  }

}
