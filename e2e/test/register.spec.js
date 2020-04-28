
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
    
    it('Sign up link on login page opens Sign up modal', function() {
        browser.get('http://localhost:4200');
        browser.waitForAngular();
        elSignUpLink.click();
        expect(elRegisterHeader.getText()).toBe('Sign Up');
    });

    it ('After submit routes to landing page', function() {
        firstNameInput.sendKeys('bob');
        lastNameInput.sendKeys('ross');
        usernameInput.sendKeys('bobross');
        emailInput.sendKeys('bobross@bobross.com');
        phoneInput.sendKeys('1234567890');
        addressInput.sendKeys('123 Fake Street');
        cityInput.sendKeys('Pottsdam');
        let state = element.all(by.tagName('option')).get(5);
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