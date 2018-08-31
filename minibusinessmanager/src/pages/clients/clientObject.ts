export class Client {
    fullName: string;
    primaryNumber: string;
    altNumber: string;
    contactSource: string;
    address: string;

    constructor(fn: string, pn: string, an: string, cs: string, add: string) {
        this.fullName = fn;
        this.primaryNumber = pn;
        this.altNumber = an;
        this.contactSource = cs;
        this.address = add;
    }

    getObject() {
        const result = {
            fullName: this.fullName,
            primaryNumber: this.primaryNumber,
            altNumber: this.altNumber,
            contactSource: this.contactSource,
            address: this.address
        }
        
        return result;
    }
}