import { browser, element, by } from "protractor"

export class profileMembership {
  driver = element(by.id('isDriver'));
  active = element(by.id('isActive'));
  yes = element(by.id('yes'));
  no = element(by.id('no'));    

  submit = element(by.id('submit'));    
  httpSuccess = element(by.id('response-success'));
  httpError = element(by.id('response-error'));    
  
  populateForm = (driver, active) => {
    this.setDriver(driver);
    this.setActive(active);
  }    
  
  setDriver = (bool) => {
    element(by.id('isDriver')).sendKeys(bool);
  }    
  
  setActive = (bool) => {
    element(by.id('isActive')).sendKeys(bool);
  }
}