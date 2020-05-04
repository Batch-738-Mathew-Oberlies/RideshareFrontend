import { element, by, $$ } from "protractor"

export class SignupModal {
    firstname   = element(by.id('firstname'));
    lastname    = element(by.id('lastname'));
    email       = element(by.id('email'));
    phone       = element(by.id('phonenumber'));
    username    = element(by.id('username'));
    batch       = element(by.id('batch'));
    address     = element(by.id('hAddress'));
    apt         = element(by.id('hAddress2'));
    city        = element(by.id('hCity'));
    state       = element(by.id('hState'));
    zip         = element(by.id('hZip'));
    preference  = element(by.id('preference'));

    inputFields = $$('.modal-body').$$('.form-control');

    submit      = element(by.id('submit'));
    modal       = element(by.id('signup-form'));
    
    httpSuccess = element(by.id('response-success'));
    httpError   = element(by.id('response-error'));
    


    populateForm = (firstname, lastname, email,
                    phone, username, batch,
                    street, apt, city,
                    state, zip, pref) => {
        this.setFirstName(firstname);
        this.setLastName(lastname);
        this.setEmail(email);
        this.setPhoneNumber(phone);
        this.setUsername(username);
        this.setBatch(batch);
        this.setStreet(street);
        this.setApt(apt);
        this.setCity(city);
        this.setState(state);
        this.setZip(zip);
        this.setPreference(pref);
    }

    open = () => {
         element(by.id('signup')).click();
    }

    close = () => {
        element(by.id('close-modal')).click();
    }

    setFirstName = (name) => {
        element(by.id('firstname')).sendKeys(name)
    }

    setLastName = (name) => {
        element(by.id('lastname')).sendKeys(name)
    }

    setEmail = (email) => {
        element(by.id('email')).sendKeys(email)
    }

    setPhoneNumber = (phone) => {
        element(by.id('phonenumber')).sendKeys(phone)
    }

    setUsername = (name) => {
        element(by.id('username')).sendKeys(name)
    }

    setBatch = (batch) => {
        element(by.cssContainingText('option', batch)).click();
    }

    setStreet = (street) => {
        element(by.id('hAddress')).sendKeys(street);
    }

    setApt = (apt) => {
        element(by.id('hAddress2')).sendKeys(apt);
    }
    
    setState = (state) => {
        element(by.cssContainingText('option', state)).click();
    }

    setZip = (zip) => {
        element(by.id('hZip')).sendKeys(zip);
    }

    setCity = (city) => {
        element(by.id('hCity')).sendKeys(city);
    }

    setPreference = (pref) => {
        element(by.cssContainingText('option', pref)).click();
    }
}