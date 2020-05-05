import { element, by } from 'protractor';

export class profileCar {

    make = element(by.id("make"));
    model = element(by.id("model"));
    nrSeats = element(by.id("nrSeats"));
    avail = element(by.id("availableSeats"));

    submit = element(by.id('submit'));
    form = element(by.id('carForm'));
    httpSuccess = element(by.id('response-success'));
    httpError = element(by.id('response-error'));

    populateForm = (make, model, nrSeats, avail) => {
        this.setMake(make);
        this.setModel(model);
        this.setNrSeats(nrSeats);
        this.setAvailNumber(avail);
      };
    
      setMake = (name) => {
        this.make.sendKeys(name);
      };
    
      setModel = (name) => {
        this.model.sendKeys(name);
      };
    
      setNrSeats = (nrSeats) => {
        this.nrSeats.sendKeys(nrSeats);
      };
    
      setAvailNumber = (avail) => {
        this.avail.sendKeys(avail);
      };
    

}