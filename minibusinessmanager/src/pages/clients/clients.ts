import { FirebaseProvider } from './../../providers/firebase/firebase';
import { AddClientPage } from './../add-client/add-client';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';
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
  numClients = 0;
  loader = this.lc.create({
    content: 'Fetching list of clients',
    spinner: 'crescent'
  });

  constructor(public navCtrl: NavController, public navParams: NavParams, public fb: FirebaseProvider, public lc: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientsPage');
    this.loader.present();
    this.clients = this.fb.getClients();
    this.clients.subscribe((data) => {
      console.log(data);
      this.numClients = data.length
      this.loader.dismiss();
    }, (error) => {
      console.log('Error: ' + error);
    });
  }

  goToAddClient(event) {
    // console.log("Going to Add Client");
    this.navCtrl.push(AddClientPage);
  }

  goToClientPage(selectedClient) {
    console.log('Clicked on ' + selectedClient.fullName);
  }

}
