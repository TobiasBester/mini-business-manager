import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Client } from '../clientObject';
import { ClientListProvider } from '../clientList';
import { AngularFirestore } from 'angularfire2/firestore';
// import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

/**
 * Generated class for the SingleClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-single-client',
  templateUrl: 'single-client.html',
})
export class SingleClientPage {

  public client: Client;
  public successToast = this.toastController.create({
    message: 'Successfully removed client',
    duration: 2000
  });
  public failureToast = this.toastController.create({
    message: 'Failed to remove client. Please try again',
    duration: 2000
  });
  public invalidToast = this.toastController.create({
    message: 'Please enter a valid value and try again',
    duration: 2000
  });

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public db: AngularFirestore, 
    public alertCtrl: AlertController, 
    public toastController: ToastController, 
    public cl: ClientListProvider ) {
    this.client = navParams.get('client');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SingleClientPage');
  }

  removeClient() {
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
            this.cl.removeClient(this.client)
            .then((response)=> {
              console.log('Removed client');
              this.successToast.present();
              this.navCtrl.pop();
            }, 
            (error) => {
              console.log('Did not remove client');
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
    let editAlert = this.alertCtrl.create({
      title: 'Editing client ' + englishAtt,
      subTitle: 'Edit the ' + englishAtt + ' of the client',
      inputs: [
        {
          name: 'attribute',
          placeholder: att
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
            if (this.stringIsValid(data.attribute)) {
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

  editNumber(att: string) {
    console.log('Editing ' + att);
    const englishAtt = this.getEnglishAttribute(att);
    let editNumAlert = this.alertCtrl.create({
      title: 'Editing client ' + englishAtt,
      subTitle: 'Edit the ' + englishAtt + ' of the client',
      inputs: [
        {
          name: 'attribute',
          placeholder: '0123456789',
          type: 'number'
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
            if (this.numIsValid(data.attribute)) {
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
    editNumAlert.present();
  }

  editContactSource(att: string) {
    console.log('Editing ' + att);
    const englishAtt = this.getEnglishAttribute(att);
    let editNumAlert = this.alertCtrl.create({
      title: 'Editing client ' + englishAtt,
      subTitle: 'Edit the ' + englishAtt + ' of the client',
      inputs: [
        {
          type: 'radio',
          label: 'Facebook',
          value: 'Facebook'
        },
        {
          type: 'radio',
          label: 'Twitter',
          value: 'Twitter'
        },
        {
          type: 'radio',
          label: 'Word of Mouth',
          value: 'Word of Mouth'
        },
        {
          type: 'radio',
          label: 'Pamphlet',
          value: 'Pamphlet'
        },
        {
          type: 'radio',
          label: 'Web Advert',
          value: 'Web Advert'
        },
        {
          type: 'radio',
          label: 'Other',
          value: 'Other'
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
            this.editObjectAttribute(att, data);
          }
        }
      ]
    })
    editNumAlert.present();
  }

  getEnglishAttribute(att: string) {
    switch (att) {
      case 'fullName': {
        return 'full name';
      }
      case 'primaryNumber': {
        return 'primary number';
      }
      case 'altNumber': {
        return 'alternate number';
      }
      case 'contactSource': {
        return 'source of contact';
      }
      case 'address': {
        return 'address';
      }
      default: {
        return 'attribute';
      }
    }
  }

  editObjectAttribute(att: string, value: string) {
    switch (att) {
      case 'fullName': {
        this.client.fullName = value;
        this.cl.editAttribute(this.client);
        break;
      }
      case 'primaryNumber': {
        this.client.primaryNumber = value;
        this.cl.editAttribute(this.client);
        break;
      }
      case 'altNumber': {
        this.client.altNumber = value;
        this.cl.editAttribute(this.client);
        break;
      }
      case 'contactSource': {
        this.client.contactSource = value;
        this.cl.editAttribute(this.client);
        break;
      }
      case 'address': {
        this.client.address = value;
        this.cl.editAttribute(this.client);
        break;
      }
      default: {
        this.cl.editAttribute(this.client);
        break;
      }
    }
  }

  numIsValid(num: string) {
    if (num.length == 10) {
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

}
