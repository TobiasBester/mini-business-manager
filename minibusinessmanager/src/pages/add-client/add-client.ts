import { FirebaseProvider } from './../../providers/firebase/firebase';
import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { AngularFirestore } from 'angularfire2/firestore';
// import { Client } from '../clients/clientObject';

/**
 * Generated class for the AddClientPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-client',
  templateUrl: 'add-client.html',
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, /* public db: AngularFirestore,
  */ public firebaseProvider: FirebaseProvider ) {
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
        Validators.maxLength(10),
        Validators.required
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
    
    const client = {
      fullName: this.addClientForm.controls['fullName'].value,
      primaryNumber: this.addClientForm.controls['primaryNumber'].value,
      altNumber: this.addClientForm.controls['altNumber'].value,
      contactSource: this.addClientForm.controls['contactSource'].value,
      address: this.addClientForm.controls['address'].value
    };

    this.firebaseProvider.addClient(client)
    .then((response) => {
      console.log('Added Client:\n' + response);
      this.addClientForm.reset();
    }, (error) => {
      console.log('Client not added!\n' + error);
    })
  }

}
