import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { PurchaseListProvider } from '../purchase-list';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { StockListProvider } from '../../stock/stock-list';
import { Purchase } from '../purchaseObject';
import { AddPurchaseProvider } from '../add-purchase';

/**
 * Generated class for the RecordPurchasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-record-purchase',
  templateUrl: 'record-purchase.html',
})
export class RecordPurchasePage {

  public recordPurchaseForm: FormGroup;
  public stockItems: Observable<any[]>;
  public stockProviderSub: Subscription;
  public totalPurchase: Purchase[] = [];
  public today = new Date();
  public todayDate = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate())
  public stockLoader = this.loadingController.create({
    content: 'Getting stock items...',
    spinner: 'crescent'
  });
  public loader = this.loadingController.create({
    content: 'Recording purchase...',
    spinner: 'crescent'
  });
  public stockFailureToast = this.toastController.create({
    message: 'Failed to get stock items. Please try again',
    duration: 2000
  });
  public successToast = this.toastController.create({
    message: 'Successfully recorded purchase!',
    duration: 2000
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public pl: PurchaseListProvider,
    public formBuilder: FormBuilder, public loadingController: LoadingController, public sl: StockListProvider,
    public toastController: ToastController, public ap: AddPurchaseProvider) {
  
    this.recordPurchaseForm = this.formBuilder.group({
      item: new FormControl('', Validators.compose([
        Validators.minLength(2),
        Validators.required
      ])),
      amount: new FormControl('', Validators.compose([
        Validators.min(1),
        Validators.max(1000),
        Validators.required
      ])),
      totalCost: new FormControl('', Validators.compose([
        Validators.min(1.0),
        Validators.max(10000.00),
        Validators.required
      ])),
      date: new FormControl('', Validators.compose([
        Validators.minLength(4),
        Validators.required
      ]))
    });
    // this.recordPurchaseForm.controls['item'].setValue('A', {onlySelf: true});
    this.recordPurchaseForm.controls['date'].setValue(this.todayDate, {onlySelf: true});
  }

  ionViewDidLoad() {
    this.stockLoader.present();
    this.stockItems = this.sl.getIngredients();
    this.stockProviderSub = this.stockItems.subscribe((data) => {
      this.stockLoader.dismiss();
    }, (error) => {
      console.log(error);
      this.stockFailureToast.present();
    });
  }

  submitForm() {
    const newPurchase: Purchase = {
      id: 'default',
      type: 'stock',
      item: this.recordPurchaseForm.controls['item'].value,
      amount: this.recordPurchaseForm.controls['amount'].value,
      totalCost: this.formatPrice(this.recordPurchaseForm.controls['totalCost'].value),
      date: this.recordPurchaseForm.controls['date'].value
    };

    this.totalPurchase.push(newPurchase);
    this.recordPurchaseForm.reset();
  }

  formatPrice(inPrice: number) {
    const strPrice: string = (inPrice * 1).toFixed(2);
    return Number(strPrice);
  }

  getTotalPurchaseCost() {
    let total: number = 0.0;
    
    if (this.totalPurchase.length == 0) {
      return this.formatPrice(total);
    }
    
    this.totalPurchase.forEach((p) => {
      total += p.totalCost;
    });

    return this.formatPrice(total);
  }

  confirmPurchase() {  
    const len = this.totalPurchase.length;

    this.loader.present();

    this.totalPurchase.forEach((p, index) => {
      this.ap.addPurchase(p).then(() => {
        if (index == len - 1) {
          this.loader.dismiss();
          this.successToast.present();
          this.navCtrl.pop();
        }
      },
      (error) => {
        console.error(error);
        this.loader.dismiss();
      });
    })
  }

}
