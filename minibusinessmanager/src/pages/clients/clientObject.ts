// export class ClientObject {
//     private _fullName: string;
//     private _primaryNumber: string;
//     private _altNumber: string;
//     private _contactSource: string;
//     private _address: string;

//     constructor(client: any[]) {
//         this._fullName = client['fullName'];
//         this._primaryNumber = client['primaryNumber'];
//         this._altNumber = client['altNumber'];
//         this._contactSource = client['contactSource'];
//         this._address = client['address'];
//         console.log('Client object constructed');
//     }

//     getObject() {
//         const result = {
//             fullName: this._fullName,
//             primaryNumber: this._primaryNumber,
//             altNumber: this._altNumber,
//             contactSource: this._contactSource,
//             address: this._address
//         }
        
//         return result;
//     }

//     get fullName(): string {
//         return this._fullName;
//     }

//     set fullName(newName: string) {
//         this._fullName = newName;
//     }

//     get primaryNumber(): string {
//         return this._primaryNumber;
//     }

//     set primaryNumber(newName: string) {
//         this._primaryNumber = newName;
//     }

//     get altNumber(): string {
//         return this._altNumber;
//     }

//     set altNumber(newName: string) {
//         this._altNumber = newName;
//     }

//     get contactSource(): string {
//         return this._contactSource;
//     }

//     set contactSource(newName: string) {
//         this._contactSource = newName;
//     }

//     get address(): string {
//         return this._address;
//     }

//     set address(newName: string) {
//         this._address = newName;
//     }

// }

export interface Client {
    fullName: string; 
    primaryNumber: string; 
    altNumber: string; 
    contactSource: string; 
    address: string;
}