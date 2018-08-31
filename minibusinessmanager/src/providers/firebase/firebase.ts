// import { Client } from './../../pages/clients/clientObject';
import { AngularFirestore } from 'angularfire2/firestore';
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor(public db: AngularFirestore) {
    console.log('Hello FirebaseProvider Provider');
  }

  addClient(client) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('clients').add(client)
      .then((response) => {
        console.log('Firebase Provider: Add Client Response\n' + response);
        resolve(response);
      },
      (error) => {
        console.log(error);
        reject(error);
      });
    });
    
  }

}
