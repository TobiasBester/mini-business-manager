import { Contacts } from '@ionic-native/contacts';
import { FirebaseProvider } from './../../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { LoadingController } from 'ionic-angular';
// import { AngularFirestore } from 'angularfire2/firestore';
import { ClientObject } from '../../clients/clientObject';
import { ClientList } from '../clientList';
import { AngularFirestore } from 'angularfire2/firestore';

/**
 * Generated class for the AddClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html'
})
export class AddClientPage {

  public addClientForm: FormGroup;
  public contactSources: string[] = [
    'Facebook',
    'Twitter',
    'Word of Mouth',
    'Pamphlet',
    'Web Advert',
    'Other'
  ];
  public defaultContactSource = 'Facebook';
  public loader = this.loadingController.create({
    content: 'Adding Client...',
    spinner: 'crescent'
  });
  public toast = this.toastController.create({
    message: 'Client was added successfully!',
    duration: 2000
  });
  public clientList: ClientList = new ClientList(this.db);

  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams,
     private formBuilder: FormBuilder, public firebaseProvider: FirebaseProvider, public loadingController: LoadingController, 
     public toastController: ToastController, public contacts: Contacts, public db: AngularFirestore) {
    
    this.addClientForm = this.formBuilder.group({
      fullName: new FormControl('', Validators.compose([
        Validators.maxLength(30),
        Validators.minLength(3),
        Validators.required
      ])
      ),
      primaryNumber: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.required
      ])),
      altNumber: new FormControl('', Validators.compose([
        Validators.minLength(10),
        Validators.maxLength(10)
      ])),
      contactSource: new FormControl(null),
      address: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.maxLength(100)
      ]))
    });
    this.addClientForm.controls['contactSource'].setValue(this.defaultContactSource, {onlySelf: true});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddClientPage');
  }

  submitNewClientForm() {
    console.log('Form Valid!');
    this.loader.present();
    
    const client = [];
    client['fullName'] = this.addClientForm.controls['fullName'].value;
    client['primaryNumber'] = this.addClientForm.controls['primaryNumber'].value;
    client['altNumber'] = this.addClientForm.controls['altNumber'].value;
    client['contactSource'] = this.addClientForm.controls['contactSource'].value;
    client['address'] = this.addClientForm.controls['address'].value;

    const newClientObject: ClientObject = new ClientObject(client);
    this.clientList.addClient(newClientObject)
      .then((response) => {
        console.log('Added Client:\n' + response);
        this.loader.dismiss();
        this.toast.present();
        this.addClientForm.reset();
      }, (error) => {
        console.log('Client not added!\n' + error);
      });
  }

  importClient() {
    console.log('Importing Client');

    this.contacts.pickContact()
      .then((contact) => {
        console.log('The following contact has been picked: ' + JSON.stringify(contact));
      },
      (error) => {
        console.log('Error:\n' + error);
    });
    
  }

  goBack() {
    console.log('POP');
    this.navCtrl.pop();
  }

}
