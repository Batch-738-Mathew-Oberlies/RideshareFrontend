import { SignupModal } from '../src/SignupModal';

var signupModal = new SignupModal();

describe('signup modal', () => {
    it('the page should open', () => {
        signupModal.get();
        signupModal.openModal();
    })
})