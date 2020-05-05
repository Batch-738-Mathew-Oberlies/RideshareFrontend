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
        this.setAvail(avail);
      };
    
      setMake = (make: string) => {
        this.make.sendKeys(make);
      };
    
      setModel = (model: string) => {
        this.model.sendKeys(model);
      };
    
      setNrSeats = (nrSeats: number) => {
        this.nrSeats.sendKeys(nrSeats);
      };
    
      setAvail = (avail: number) => {
        this.avail.sendKeys(avail);
      };
    
}