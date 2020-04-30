import { browser, element, by } from "protractor"

export class SignupModal {
    email       = element(by.id('email'));
    modal       = element(by.id('signup'));
    state       = element(by.id('hState'));
    batch       = element(by.id('batch'));
    preference  = element(by.id('preference'));
    submit      = element(by.id('submit'));

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
        element(by.id('phoneNumber')).sendKeys(phone)
    }

    setUsername = (name) => {
        element(by.id('userName')).sendKeys(name)
    }

    //"1 Morgantown", "2 Virginia"
    setBatch = (batch) => {
        element(by.cssContainingText('option', batch)).click();
    }

    setStreet = (street) => {
        element(by.id('hAddress')).sendKeys(street);
    }

    setApt = (apt) => {
        element(by.id('Address2')).sendKeys(apt);
    }
    
    setState = (state) => {
        //element(by.id('hState')).sendKeys(state);
        element(by.cssContainingText('option', state)).click();
    }

    setZip = (zip) => {
        element(by.id('zip')).sendKeys(zip);
    }

    setCity = (city) => {
        element(by.id('city')).sendKeys(city);
    }

    setPreference = (pref) => {
        element(by.cssContainingText('option', pref)).click();
    }
}