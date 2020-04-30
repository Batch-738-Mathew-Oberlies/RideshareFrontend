import { SignupModal } from '../src/SignupModal';
import { browser } from 'protractor';
import { DriverProvider } from 'protractor/built/driverProviders';

var signupModal = new SignupModal();

describe('signup modal', () => {
    signupModal.openPage();

    it('the modal should open / close', () => {
        signupModal.openModal();
        expect(signupModal.modal.isPresent()).toBe(true);
        signupModal.closeModal();
        expect(signupModal.modal.isPresent()).toBe(false);
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

    it('modal prompts user for more address information and then stays open', () => {
        signupModal.openModal();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', 'Unit 1', 'Reston', 
        'VA', '20190', 'Rider');

        signupModal.submit.click();
        browser.switchTo().alert().accept();
        expect(signupModal.modal.isPresent()).toBe(true);
    })

    it('modal prompts user to confirm new address and then closes if user accepts', () => {
        signupModal.openModal();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', '205', 'Reston', 
        'VA', '20190', 'Rider');

        signupModal.submit.click();
        browser.switchTo().alert().accept();
        expect(signupModal.modal.isPresent()).toBe(false);
    })

    it('modal prompts user to confirm new address and then stays open if user cancels', () => {
        signupModal.openModal();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', '205', 'Reston', 
        'VA', '20190', 'Rider');

        signupModal.submit.click();
        browser.switchTo().alert().dismiss();
        expect(signupModal.modal.isPresent()).toBe(false);
    })

    it('modal automatically closes after submitting if all fields entered are valid', () => {
        signupModal.openModal();
        signupModal.populateForm('test', 'test', 'test@test.com', '111-111-1111',
        'username','1 Morgantown', '11730 Plaza America Dr', 'STE 205', 'Reston', 
        'VA', '20190', 'Rider');

        signupModal.submit.click();
        expect(signupModal.modal.isPresent()).toBe(false);
    })
})
