import { SignupModal }  from '../src/SignupModal';
import { browser }      from 'protractor';
import { protractor }   from 'protractor/built/ptor';

var signupModal = new SignupModal();

describe('signup modal', () => {
    browser.get('http://localhost:4200');

    it('Test 1: the modal should open / close', () => {
        signupModal.open();
        expect(signupModal.modal.isPresent()).toBe(true);
        signupModal.close();
        expect(signupModal.modal.isPresent()).toBe(false);
    })

    it('Test 2: dropdown input fields should accept input from user', () => {
        signupModal.open();
        signupModal.setState('AR');
        expect(signupModal.state.getAttribute('value')).toBe('AR');
        signupModal.setBatch('1 Morgantown');
        expect(signupModal.batch.getAttribute('value')).toBe('1 Morgantown');
        signupModal.setPreference('Rider');
        expect(signupModal.preference.getAttribute('value')).toBe('rider');
        signupModal.close();
    })

    it('Test 3: modal prompts user for more address information and then stays open', () => {
        signupModal.open();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', 'Unit 1', 'Reston', 
        'VA', '20190', 'Rider');
        signupModal.submit.click();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000)
        browser.switchTo().alert().dismiss();
        expect(signupModal.modal.isPresent()).toBe(true);
        signupModal.close();
    })

    it('Test 4: modal prompts user to confirm new address and then shows success/failure message', () => {
        signupModal.open();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', '205', 'Reston', 
        'VA', '20190', 'Rider');
        signupModal.submit.click();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000)
        browser.switchTo().alert().accept();

        //waiting for backend response.
        //@TODO: exchange signupModal.httpError with signupModal.httpSuccess before release
        browser.wait(protractor.ExpectedConditions.visibilityOf(signupModal.httpError), 10000);
        expect(signupModal.httpError.isPresent()).toBe(true);
        signupModal.close();
    })

    it('Test 5: modal prompts user to confirm new address and then stays open if user cancels', () => {
        signupModal.open();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', '205', 'Reston', 
        'VA', '20190', 'Rider');
        signupModal.submit.click();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000)
        browser.switchTo().alert().dismiss();
        expect(signupModal.modal.isPresent()).toBe(true);
        signupModal.close();
    })

    it('Test 6: modal shows feedback message on submit', () => {
        signupModal.open();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', 'STE 205', 'Reston', 
        'VA', '20190', 'Rider');
        signupModal.submit.click();
        
        //waiting for backend response.
        //@TODO: exchange signupModal.httpError with signupModal.httpSuccess before release
        browser.wait(protractor.ExpectedConditions.visibilityOf(signupModal.httpError), 10000);
        expect(signupModal.httpError.isPresent()).toBe(true);
        signupModal.close();
    })

    it('Test 7: Alert pops up with a notificatiton that the information is wrong', () => {
        signupModal.open();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '111 testpl', '', 'example', 
        'VA', '11111', 'Rider');
        signupModal.submit.click();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000)
        expect(browser.switchTo().alert().getText()).toBe('Invalid Zip Code.  ');
        browser.switchTo().alert().accept();
        signupModal.close();
    })

    it('Test 8: When modal is populated and closed without submitting, all the values should be blank when opening again', () => {
        signupModal.open();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', 'STE 205', 'Reston', 
        'VA', '20190', 'Rider');
        signupModal.close();
        signupModal.open();

        let inputValues = signupModal.inputFields.map((elm, index) => {
            return {
              index: index,
              value: elm.getAttribute('value')
            };
        });

        expect(inputValues).toEqual([
        {index: 0,  value: ''},
        {index: 1,  value: ''},
        {index: 2,  value: ''},
        {index: 3,  value: ''},
        {index: 4,  value: ''},
        {index: 5,  value: ''},
        {index: 6,  value: ''},
        {index: 7,  value: ''},
        {index: 8,  value: ''},
        {index: 9,  value: ''},
        {index: 10, value: ''},
        {index: 11, value: ''}
        ]);

        signupModal.close();
    })

    it('Test 9: an alert should prompt the user that more information is required and then the modal should remain open', () => {
        signupModal.open();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', '', 'Reston', 
        'VA', '20190', 'Rider');
        signupModal.submit.click();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000)
        browser.switchTo().alert().accept();
        expect(signupModal.modal.isPresent()).toBe(true);
    })
})
