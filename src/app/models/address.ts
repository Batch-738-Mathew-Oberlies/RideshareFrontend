
/**
 * Address model
 */

export class Address {
    constructor(apt, street, city, state, zip) {
        this.apt = apt;
        this.street = street;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    id: number;
    street: string;
    apt: string;
    city: string;
    state: string;
    zip: string;
}