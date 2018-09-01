import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AddClientPage } from './../add-client/add-client';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs';

/**
 * Generated class for the ClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-clients',
  templateUrl: 'clients.html',
})
export class ClientsPage {

  clients: Observable<any[]>;
  clientObjects: {}[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FirebaseProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientsPage');
    this.clients = this.fb.getClients();
    this.clients.subscribe((data) => {
      console.log(data);
      // this.clientObjects = data;
    }, (error) => {
      console.log('Error: ' + error);
    });
  }

  goToAddClient(event) {
    // console.log("Going to Add Client");
    this.navCtrl.push(AddClientPage);
  }

}
