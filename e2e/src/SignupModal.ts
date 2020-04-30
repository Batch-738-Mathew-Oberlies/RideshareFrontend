import { browser, element, by } from "protractor"

export class SignupModal {
    firstname   = element(by.id('firstname'))
    lastname    = element(by.id('lastname'));
    email       = element(by.id('email'));
    phone       = element(by.id('phonenumber'))
    username    = element(by.id('username'))
    batch       = element(by.id('batch'));
    address     = element(by.id('hAddress'));
    apt         = element(by.id('hAddress2'))
    city        = element(by.id('hCity'))
    state       = element(by.id('hState'));
    zip         = element(by.id('hZip'))
    preference  = element(by.id('preference'));

    submit      = element(by.id('submit'));
    modal       = element(by.id('signup-form'));
    


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


    openPage = () => {
        browser.get('http://localhost:4200');
    }

    openModal = () => {
        element(by.id('signup')).click();
    }

    closeModal = () => {
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

    //"1 Morgantown", "2 Virginia"
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
        //element(by.id('hState')).sendKeys(state);
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