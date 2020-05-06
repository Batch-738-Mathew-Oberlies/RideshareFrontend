import { by, element } from 'protractor';

export class profileContact {
  firstName = element(by.id("firstName"));
  lastName = element(by.id("lastName"));
  email = element(by.id("email"));
  phone = element(by.id("phone"));

  submit = element(by.id('submit'));
  form = element(by.id('contactInfoForm'));
  httpSuccess = element(by.id('response-success'));

  setFirstName = (name) => {
    this.firstName.sendKeys(name);
  };

  setLastName = (name) => {
    this.lastName.sendKeys(name);
  };

  setEmail = (email) => {
    this.email.sendKeys(email);
  };

  setPhoneNumber = (phone) => {
    this.phone.sendKeys(phone);
  };
}