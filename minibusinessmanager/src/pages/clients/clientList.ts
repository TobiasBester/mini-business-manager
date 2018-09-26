import { Client } from "../clients/clientObject"
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from "angularfire2/firestore";
import { Observable } from "rx";


export class ClientList {
    private listOfClients: Client[] = [];
    private clientCollection: AngularFirestoreCollection<Client>;
    private clientsData: any;
    
    constructor(public db: AngularFirestore) {
        this.clientCollection = db.collection<Client>('clients');
        this.clientsData = this.clientCollection.valueChanges();
    }

    public getClientObjects(): Client[] {
        return this.listOfClients;
    };

    public addClient(c: Client) {
        this.listOfClients.push(c);

        return new Promise<any>((resolve, reject) => {
            this.clientCollection.add(c)
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

    public getClientListData() {

        return this.clientsData;
    }

    public removeClient(client) {

    }
}