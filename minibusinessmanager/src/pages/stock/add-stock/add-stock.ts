import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Stock } from '../stockObject';
import { StockListProvider } from '../stock-list';

/**
 * Generated class for the AddStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-stock',
  templateUrl: 'add-stock.html',
})
export class AddStockPage {

  public addStockForm: FormGroup;
  public loader = this.loadingController.create({
    content: 'Adding Stock Item...',
    spinner: 'crescent'
  });
  public successToast = this.toastController.create({
    message: 'Stock Item was added successfully!',
    duration: 2000
  });
  public failureToast = this.toastController.create({
    message: 'Failed to add stock item. Please try again',
    duration: 2000
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastController: ToastController,
    public loadingController: LoadingController, public formBuilder: FormBuilder, public sl: StockListProvider) {

      this.addStockForm = this.formBuilder.group({
        name: new FormControl('', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.required
        ])),
        quantity: new FormControl('', Validators.compose([
          Validators.min(0),
          Validators.required
        ]))
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddStockPage');
  }

  submitNewStock() {
    console.log('Form Valid!');
    this.loader.present();

    const newStockItem: Stock = {
      id: 'default',
      name: this.addStockForm.controls['name'].value,
      quantity: this.addStockForm.controls['quantity'].value
    };

    this.sl.addStock(newStockItem)
      .then((response) => {
        this.loader.dismiss();
        this.successToast.present();
        this.addStockForm.reset();
      }, (error) => {
        console.log('Stock item not added!\n' + error);
        this.failureToast.present();
        this.loader.dismiss();
      });
  }

}
