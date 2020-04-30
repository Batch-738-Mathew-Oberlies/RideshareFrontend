import { SignupModal } from '../src/SignupModal';
import { browser } from 'protractor';

var signupModal = new SignupModal();

describe('signup modal', () => {
    signupModal.openPage();

    it('the modal should open / close', () => {
        signupModal.openModal();
        expect(signupModal.modal.isDisplayed()).toBeTruthy();
        signupModal.closeModal();
        browser.waitForAngular();
        expect(signupModal.modal.getLocation()).toBeFalsy();
    })

    it('all input fields should accept input from user', () => {
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

    it('valid inputs allow the user to click on the submit button', () => {
        signupModal.openModal();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', '', 'Reston', 
        'VA', '20190', 'Rider');

        signupModal.submit.click();
        expect(signupModal.modal.isDisplayed()).toBeFalsy();
    })
})
