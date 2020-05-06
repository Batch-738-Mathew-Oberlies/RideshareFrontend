import { browser, element, by } from "protractor";

export class ProfileLocation {

    homeStreet = element(by.id("homeStreet"));
    homeAddressApt = element(by.id("homeAddressApt"));
    homeCity = element(by.id("homeCity"));
    homeState = element(by.id("homeState"));
    homeZipcode = element(by.id("homeZipcode"));

    workStreet = element(by.id("workStreet"));
    workAddressApt = element(by.id("workAddressApt"));
    workCity = element(by.id("workCity"));
    workState = element(by.id("workState"));
    workZipcode = element(by.id("workZipcode"));

    form = element(by.id('profileLocationForm'));
    submit = element(by.id('submit'));
    httpSuccess = element(by.id('response-success'));

    constructor(){}

    setHomeCity = (hcity: any) => {
        this.homeCity.sendKeys(hcity);
    }

    setHomeStreet = (hstreet: any) => {
        this.homeStreet.sendKeys(hstreet);
    }

    setHomeAddressApt = (haddressapt: any) => {
        this.homeAddressApt.sendKeys(haddressapt);
    }

    setHomeState = (hstate: any) => {
        this.homeState.sendKeys(hstate);
    }

    setHomeZipcode = (hzipcode: any) => {
        this.homeZipcode.sendKeys(hzipcode)
    }


    setWorkStreet= (wstreet: any) => {
        this.workStreet.sendKeys(wstreet);
    }

    setWorkAddressApt= (wapt: any) => {
        this.workAddressApt.sendKeys(wapt);
    }

    setWorkCity = (wcity: any) => {
        this.workCity.sendKeys(wcity);
    }

    setWorkState= (wstate: any) =>{
        this.workState.sendKeys(wstate);
    }

    setWorkZipcode = (wzip: any) => {
        this.workZipcode.sendKeys(wzip);
    }

}
