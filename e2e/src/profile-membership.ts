import { browser, element, by } from "protractor"

export class profileMembership {
  driver = element(by.id('isDriver'));
  active = element(by.id('isActive'));
  acceptingRides = element(by.id('acceptingRidesBtn'));

  submit = element(by.id('submit'));    
  httpSuccess = element(by.id('response-success')); 
  
  setDriver = (string) => {
    element(by.cssContainingText('option', string)).click();
  }    
  
  setActive = (string) => {
    element(by.cssContainingText('option', string)).click();
  }    
}