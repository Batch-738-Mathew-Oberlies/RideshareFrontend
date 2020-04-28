
describe('Sign Up tests', function(){
    let elSignUpLink = element(by.xpath('/html/body/app-root/app-home-page/div/div/div/button[2]/signupmodal/a'));
    let elRegisterHeader = element(by.xpath('/html/body/modal-container/div/div/div[1]/h4'));
    let firstNameInput = element(by.xpath('//*[@id="firstname"]'));
    let lastNameInput = element(by.xpath('//*[@id="lastname"]'));
    let usernameInput = element(by.xpath('//*[@id="userName"]'));
    let emailInput = element(by.xpath('//*[@id="email"]'));
    let phoneInput = element(by.xpath('//*[@id="phoneNumber"]'));
    let addressInput = element(by.xpath('//*[@id="hAddress"]'));
    let cityInput = element(by.xpath('/html/body/modal-container/div/div/div[2]/input[7]'));
    let stateInput = element(by.xpath('//*[@id="hState"]'));
    let zipCodeInput = element(by.xpath('/html/body/modal-container/div/div/div[2]/input[8]'));
    let driverRadio = element(by.xpath('//*[@id="driver"]'));
    let submitButton = element('/html/body/modal-container/div/div/div[2]/div[2]/button');
    
    it('insert text into form', () => {
        browser.get('http://localhost:4200');
        browser.waitForAngular();
        element(by.xpath('/html/body/app-root/app-home-page/div[1]/div/div/button[2]'))
                .click();

    })

    // it('Sign up link on login page opens Sign up modal', function() {
    //     browser.get('http://localhost:4200');
    //     browser.waitForAngular();
    //     elSignUpLink.click();
    //     expect(elRegisterHeader.getText()).toBe('Sign Up');
    // });

    // it ('After submit routes to landing page', function() {
    //     firstNameInput.sendKeys('bob');
    //     lastNameInput.sendKeys('ross');
    //     usernameInput.sendKeys('bobross');
    //     emailInput.sendKeys('bobross@bobross.com');
    //     phoneInput.sendKeys('1234567890');
    //     addressInput.sendKeys('123 Fake Street');
    //     cityInput.sendKeys('Pottsdam');
    //     let state = element.all(by.tagName('option')).get(5);
    //     state.click();
    //     zipCodeInput.sendKeys('23456');
    //     expect(browser.getCurrentUrl()).toBe('http://localhost:4200/');
    //     browser.get('http://localhost:4200/');
    // });
});