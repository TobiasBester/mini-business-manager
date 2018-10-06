import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController } from 'ionic-angular';
import { Dish } from '../dishObject';
import { DishListProvider } from '../dish-list';

/**
 * Generated class for the SingleDishPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-dish',
  templateUrl: 'single-dish.html',
})
export class SingleDishPage {

  public dish: Dish;
  public successToast = this.toastController.create({
    message: 'Successfully removed dish',
    duration: 2000
  });
  public failureToast = this.toastController.create({
    message: 'Failed to remove dish. Please try again',
    duration: 2000
  });
  public invalidToast = this.toastController.create({
    message: 'Please enter a valid value and try again',
    duration: 2000
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastController: ToastController,
    public dl: DishListProvider, public alertCtrl: AlertController) {
    this.dish = navParams.get('dish');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleDishPage');
  }

  removeDish() {
    let confirmAlert = this.alertCtrl.create({
      title: 'Remove client',
      subTitle: 'Are you sure you want to remove this client?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.dl.removeDish(this.dish)
            .then((response)=> {
              console.log('Removed dish');
              this.successToast.present();
              this.navCtrl.pop();
            }, 
            (error) => {
              console.log('Did not remove dish');
              console.log(error);
              this.failureToast.onDidDismiss(() => {
                this.failureToast.present();
              });
            });
          }
        }
      ]
    });
    confirmAlert.present();
  }

  editAttribute(att: string) {
    console.log('Editing ' + att);
    const englishAtt = this.getEnglishAttribute(att);
    const attType = this.getType(att);
    let editAlert = this.alertCtrl.create({
      title: 'Editing dish ' + englishAtt,
      subTitle: 'Edit the ' + englishAtt + ' of the dish',
      inputs: [
        {
          name: 'attribute',
          placeholder: att,
          type: attType
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Confirm',
          handler: (data) => {
            if (this.valueIsValid(data.attribute)) {
              this.editObjectAttribute(att, data.attribute);
            } else {
              this.invalidToast.onDidDismiss(() => {
                this.invalidToast.present();
              });
              return false;
            }
          }
        }
      ]
    })
    editAlert.present();
  }

  getEnglishAttribute(att: string) {
    switch (att) {
      case 'name': {
        return 'name';
      }
      case 'price': {
        return 'price';
      }
      default: {
        return 'attribute';
      }
    }
  }

  getType(att: string) {
    switch (att) {
      case 'name': {
        return 'text';
      }
      case 'price': {
        return 'number';
      }
      default: {
        return 'text';
      }
    }
  }

  editObjectAttribute(att: string, value) {
    switch (att) {
      case 'name': {
        this.dish.name = value;
        this.dl.editAttribute(this.dish);
        break;
      }
      case 'price': {
        this.dish.price = value;
        this.dl.editAttribute(this.dish);
        break;
      }
      default: {
        this.dl.editAttribute(this.dish);
        break;
      }
    }
  }

  numIsValid(num: number) {
    if (num > 0 && num < 10000) {
      return true;
    } else {
      return false;
    }
  }

  stringIsValid(string: string) {
    if (string.length > 3) {
      return true;
    } else {
      return false;
    }
  }

  valueIsValid(value: any) {
    if (typeof(value) == 'number') {
      return this.numIsValid(value);
    } else {
      return this.stringIsValid(value);
    }
  }

}
