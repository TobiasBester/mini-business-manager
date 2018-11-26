import { Client } from "../clients/clientObject";
// import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "angularfire2/firestore";
import { AngularFirestore, AngularFirestoreCollection } from "angularfire2/firestore";
import { Injectable } from "@angular/core";
// import { Observable } from "rx";

@Injectable()
export class ClientListProvider {
    private listOfClients: Client[] = [];
    private clientCollection: AngularFirestoreCollection<Client>;
    // private clientsData: any;
    
    constructor(public db: AngularFirestore) {
        this.clientCollection = db.collection<Client>('clients', ref => ref.orderBy('fullName'));
        // this.clientsData = this.clientCollection.valueChanges();
    }

    public getClientObjects(): Client[] {
        return this.listOfClients;
    };

    public addClient(c: Client) {
        const id = this.db.createId();
        c.id = id;
        this.listOfClients.push(c);

        return new Promise<any>((resolve, reject) => {
            // this.clientCollection.add(c)
            this.clientCollection.doc(id).set(c)
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

    public sortBy(attribute: string) {
        this.clientCollection = this.db.collection<Client>('clients', ref => ref.orderBy(attribute));
        // this.clientsData = this.clientCollection.valueChanges();
    }

    public getClientListData() {
        return this.clientCollection.valueChanges();
    }

    public getClientsWithCurrentOrders() {
        return this.db.collection<Client>('clients', ref => ref.where('numCurrentOrders','>',0).orderBy('numCurrentOrders')).valueChanges();
    }

    public getClientsForOrders() {
        return this.clientCollection.valueChanges();
    }

    public removeClient(client) {
        return new Promise<any>((resolve, reject) => {
            this.clientCollection.doc<Client>(client.id).delete()
            .then((response) => {
                console.log('Firebase Provider: Delete Response\n' + response);
                resolve(response);
            },
            (error) => {
                console.log(error);
                reject(error);
            });
        })
    }

    public editAttribute(client) {
        return new Promise<any>((resolve, reject) => {
            this.clientCollection.doc<Client>(client.id).update(client)
            .then((response) => {
                console.log('Firebase Provider: Edited Attribute\n' + response);
                resolve(response);
            },
            (error) => {
                console.log(error);
                reject(error);
            }
            );
        });
    }
}