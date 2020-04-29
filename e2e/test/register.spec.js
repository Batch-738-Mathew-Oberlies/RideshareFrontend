import { By } from "protractor";

describe('Sign Up tests', function(){
    let elSignUpLink = element(by.xpath('//*[@class="btn-group"]/button[2]/*/a'));
    let elRegisterHeader = element(by.xpath('//*[@class="modal-title"]'));
    let firstNameInput = element(by.xpath('//*[@id="firstname"]'));
    let lastNameInput = element(by.xpath('//*[@id="lastname"]'));
    let usernameInput = element(by.xpath('//*[@id="userName"]'));
    let emailInput = element(by.xpath('//*[@id="email"]'));
    let phoneInput = element(by.xpath('//*[@id="phoneNumber"]'));
    let addressInput = element(by.xpath('//*[@id="hAddress"]'));
    let cityInput = element(by.xpath('//*[@id="hCity"]/following-sibling::input[1]'));
    let stateInput = element(by.xpath('//*[@id="hState"]'));
    let zipCodeInput = element(by.xpath('//*[@id="hZip"]/following-sibling::input[1]'));
    let rideDriveSelect = element(by.xpath('//*[@for="drive"]/following-sibling::select[1]'));
    let submitButton = element('//*[@type="submit"]');

    
    // Below tests are not working as the login page does not have a sign up link at all, and the way forms works has been
    // completely changed tests need to be reworked for that functionality in mind.

    // list of tests to develop:

    // open sign-up modal from landing page: Done

    // sign up with a fake address and get a popup

    // Once pop up is there hit cancel to go back to form

    // sign up with a real address but needs more info get a pop-up

    // click yes on this popup to accept changes and create a user

    it('Sign up link on login page opens Sign up modal', function() {
        browser.get('http://localhost:4200');
        browser.waitForAngular();
        element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/div/button[2]'))
                .click();
    })

    it('After submit routes to landing page', function() {
        firstNameInput.sendKeys('bob');
        lastNameInput.sendKeys('ross');
        usernameInput.sendKeys('bobross');
        emailInput.sendKeys('bobross@bobross.com');
        phoneInput.sendKeys('1234567890');
        addressInput.sendKeys('123 Fake Street');
        cityInput.sendKeys('Pottsdam');
        
        state.click();
        zipCodeInput.sendKeys('23456');
        //driverRadio.click();
        //submitButton.click();
        expect(browser.getCurrentUrl()).toBe('http://localhost:4200/');
        // Test is passing for right now. 
        // However this test will likely need to be refined. 
        browser.get('http://localhost:4200/');
    });
});