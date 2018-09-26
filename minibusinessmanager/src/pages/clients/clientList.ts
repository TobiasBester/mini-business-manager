import { ClientObject } from "../clients/clientObject"
import { AngularFirestore } from "angularfire2/firestore";

export class ClientList {
    private listOfClients: ClientObject[] = [];
    
    constructor(public db: AngularFirestore) {
    }

    public getClientObjects(): ClientObject[] {
        return this.listOfClients;
    };

    public addClient(co: ClientObject) {
        this.listOfClients.push(co);

        return new Promise<any>((resolve, reject) => {
            this.db.collection('clients').add(co.getObject())
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
        return this.db.collection('clients').valueChanges();
    }
}