import { browser, element, by } from "protractor"

var SignupModal = () => {
    this.get = () => {
        browser.get('http://localhost:4200');
    }

    this.openModal = () => {
        element(by.id('signup')).click();
    }

    
}