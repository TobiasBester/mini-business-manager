import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { Client } from '../clientObject';
import { ClientList } from '../clientList';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

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

  public cl: ClientList = new ClientList(this.db);
  public client: Client;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: AngularFirestore, 
    public alertCtrl: AlertController ) {
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
            console.log(this.client.fullName + ' deleted');
            this.cl.removeClient(this.client);
          }
        }  
      ]
    });
    confirmAlert.present();
  }

}
