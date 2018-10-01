import { AddClientPage } from './add-client/add-client';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { ClientList } from './clientList';
import { AngularFirestore } from 'angularfire2/firestore';
import { SingleClientPage } from './single-client/single-client';

/**
 * Generated class for the ClientsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
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
  public clientList: ClientList = new ClientList(this.db);

  constructor(public navCtrl: NavController, public navParams: NavParams, public lc: LoadingController, 
    public db: AngularFirestore, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientsPage');
    this.loader.present();
    this.clients = this.clientList.getClientListData();
    this.clients.subscribe((data) => {
      this.numClients = data.length
      this.loader.dismiss();
    }, (error) => {
      console.log('Error: ' + error);
    });
  }

  sortList() {
    let sortAlert = this.alertCtrl.create({
      title: 'Sort list of clients',
      subTitle: 'Select which attribute to sort by',
      inputs: [
        {
          type: 'radio',
          label: 'Name',
          value: 'fullName'
        },{
          type: 'radio',
          label: 'Primary Number',
          value: 'primaryNumber'
        },
        {
          type: 'radio',
          label: 'Source of Contact',
          value: 'contactSource'
        },
        {
          type: 'radio',
          label: 'Address',
          value: 'address'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Sort By',
          handler: (data) => {
            this.clientList.sortBy(data);
            this.clients = this.clientList.getClientListData();
          }
        }
      ]
    });
    sortAlert.present();
  }

  goToAddClient() {
    // console.log("Going to Add Client");
    this.navCtrl.push(AddClientPage);
  }

  goToClientPage(selectedClient) {
    this.navCtrl.push(SingleClientPage, { client: selectedClient });
  }

}
