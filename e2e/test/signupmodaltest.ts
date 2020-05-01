import { SignupModal } from '../src/SignupModal';
import { browser } from 'protractor';
import { protractor } from 'protractor/built/ptor';

var signupModal = new SignupModal();

describe('signup modal', () => {
    signupModal.openPage();

    it('Test 1: the modal should open / close', () => {
        signupModal.openModal();
        expect(signupModal.modal.isPresent()).toBe(true);
        signupModal.closeModal();
        expect(signupModal.modal.isPresent()).toBe(false);
    })

    it('Test 2: all input fields should accept input from user', () => {
        signupModal.openModal();
        signupModal.setFirstName('logan')
        signupModal.setEmail('logan@email.com')
        expect(signupModal.email.getAttribute('value')).toBe('logan@email.com');
        signupModal.setState('AR');
        expect(signupModal.state.getAttribute('value')).toBe('AR');
        signupModal.setBatch('1 Morgantown');
        expect(signupModal.batch.getAttribute('value')).toBe('1 Morgantown');
        signupModal.setPreference('Rider');
        expect(signupModal.preference.getAttribute('value')).toBe('rider');
        signupModal.closeModal();
    })

    it('Test 3: modal prompts user for more address information and then stays open', () => {
        signupModal.openModal();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', 'Unit 1', 'Reston', 
        'VA', '20190', 'Rider');

        signupModal.submit.click();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000)
        browser.switchTo().alert().dismiss();
        expect(signupModal.modal.isPresent()).toBe(true);
        signupModal.closeModal();
    })

    it('Test 4: modal prompts user to confirm new address and then closes if user accepts', () => {
        signupModal.openModal();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', '205', 'Reston', 
        'VA', '20190', 'Rider');

        signupModal.submit.click();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000)
        browser.switchTo().alert().accept();
        expect(signupModal.modal.isPresent()).toBe(false);
    })

    it('Test 5: modal prompts user to confirm new address and then stays open if user cancels', () => {
        signupModal.openModal();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', '205', 'Reston', 
        'VA', '20190', 'Rider');

        signupModal.submit.click();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000)
        browser.switchTo().alert().dismiss();
        expect(signupModal.modal.isPresent()).toBe(true);
        signupModal.closeModal();
    })

    it('Test 6: modal should automatically close after submitting if all fields entered are valid', () => {
        signupModal.openModal();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', 'STE 205', 'Reston', 
        'VA', '20190', 'Rider');

        signupModal.submit.click();
        browser.sleep(500);
        expect(signupModal.modal.isPresent()).toBe(false);
    })

    it('Test 7: Alert pops up with a notificatiton that the information is wrong', () => {
        signupModal.openModal();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '111 testpl', '', 'example', 
        'VA', '11111', 'Rider');

        signupModal.submit.click();
        browser.wait(protractor.ExpectedConditions.alertIsPresent(), 10000)
        expect(browser.switchTo().alert().getText()).toBe('Invalid Zip Code.  ');
        browser.switchTo().alert().accept();
        signupModal.closeModal();
    })

    it('Test 8: When modal is closed and then opened again fields should be blank', () => {
        signupModal.openModal;
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', 'STE 205', 'Reston', 
        'VA', '20190', 'Rider');
        
        signupModal.closeModal();
        signupModal.openModal();
        expect(signupModal.firstname.getAttribute('value')).toBe('');
    })
})
