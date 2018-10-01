import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Dish } from '../dishObject';
import { DishListProvider } from '../dish-list';

/**
 * Generated class for the AddDishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-dish',
  templateUrl: 'add-dish.html',
})
export class AddDishPage {

  public addDishForm: FormGroup;
  public ingredients: string[] = [
    'Beef',
    'Chicken',
    'Pork',
    'Rice',
    'Noodles',
    'Pastry',
    'Vegetables'
  ];
  public loader = this.loadingController.create({
    content: 'Adding Dish...',
    spinner: 'crescent'
  });
  public successToast = this.toastController.create({
    message: 'Dish was added successfully!',
    duration: 2000
  });
  public failureToast = this.toastController.create({
    message: 'Failed to add dish. Please try again',
    duration: 2000
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingController: LoadingController, 
    public toastController: ToastController, private formBuilder: FormBuilder, public dl: DishListProvider) {

      this.addDishForm = this.formBuilder.group({
        name: new FormControl('', Validators.compose([
          Validators.minLength(3),
          Validators.maxLength(50),
          Validators.required
        ])),
        price: new FormControl('', Validators.compose([
          Validators.min(0.0),
          Validators.required
        ])),
        ingredients: new FormControl(null)
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddDishPage');
  }

  submitNewDishForm() {
    console.log('Form Valid!');
    this.loader.present();

    const newDish: Dish = {
      id: 'default',
      name: this.addDishForm.controls['name'].value,
      price: this.addDishForm.controls['price'].value,
      ingredients: this.addDishForm.controls['ingredients'].value
    };

    this.dl.addDish(newDish)
      .then((response) => {
        this.loader.dismiss();
        this.successToast.present();
        this.addDishForm.reset();
      }, (error) => {
        console.log('Dish not added!\n' + error);
        this.failureToast.present();
      });
  }

  formatPrice(price: number) {
    return price.toFixed(2);
  }

}
