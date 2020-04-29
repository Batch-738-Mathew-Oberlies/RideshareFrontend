import { browser, element, by } from "protractor"

export class SignupModal {
    get = () => {
        browser.get('http://localhost:4200');
    }

    openModal = () => {
        element(by.id('signup')).click();
    }

    setFirstName = (name) => {
        element(by.id('firstname')).sendKeys(name)
    }

    setLastName = (name) => {
        element(by.id('lastname')).sendKeys(name)
    }

    tsetEmail = (email) => {
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
        element.all(by.options('drive'))
    }

    setStreet = (street) => {
        element(by.id('hAddress')).sendKeys(street);
    }

    setApt = (apt) => {
        element(by.id('Address2')).sendKeys(apt);
    }
    
    setState = (state) => {
        element(by.id('hState')).sendKeys(state);
    }

    setZip = (zip) => {
        element(by.id('zip')).sendKeys(zip);
    }

    setPreference = (pref) => {
        element(by.id('drive'))
    }
}