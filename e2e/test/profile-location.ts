import { browser, element, by } from "protractor";
import { ProfileLocation } from "../src/profile-location";
import { protractor } from 'protractor/built/ptor';

var pl = new ProfileLocation();

describe("Profile Location Components Tests", () => {
  browser.get('http://localhost:4200');

  it('Test 0: user should be able to login', () => {
    browser.waitForAngular();
    browser.ignoreSynchronization=true
    element(by.id("login-btn")).click();
    element(by.id("formGroupExampleInput")).sendKeys("tcurd9");
    element(by.id("formGroupExampleInput2")).sendKeys("");
    element(by.id("sign-in-btn")).click();
    browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id("navbarDropdown"))), 15000);
    expect(browser.getCurrentUrl()).toBe("http://localhost:4200/landingPage");
  });

  it('Test 1: user should be able to navigate to profile-location', () => {
    browser.waitForAngular();
    browser.ignoreSynchronization=true
    browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id("navbarDropdown"))), 15000);
    element(by.id("navbarDropdown")).click();
    browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id("profileDropdown"))), 15000);
    element(by.id("profileDropdown")).click();
    browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id('contactInfoForm'))), 15000);
    expect(browser.getCurrentUrl()).toBe("http://localhost:4200/profile");
    element(by.id("locationButton")).click();
    expect(pl.form.isPresent()).toBe(true);
  });

  it("Test 2: Profile location form is prefilled with information", () => {
    browser.waitForAngular();
    browser.ignoreSynchronization=true;
    expect(pl.homeStreet.getAttribute("value")).toBeTruthy();
    expect(pl.homeCity.getAttribute("value")).toBeTruthy();
    expect(pl.homeState.getAttribute("value")).toBeTruthy();
    expect(pl.homeZipcode.getAttribute("value")).toBeTruthy();

    expect(pl.workStreet.getAttribute("value")).toBeTruthy();
    expect(pl.workCity.getAttribute("value")).toBeTruthy();
    expect(pl.workState.getAttribute("value")).toBeTruthy();
    expect(pl.workZipcode.getAttribute("value")).toBeTruthy();
  });

  it("Test 3: user cannot submit form without making any changes", () => {
    expect(pl.submit.isEnabled()).toBe(false);
  });


  it("Test 4: submit button is only enabled when info is changed and valid.", () => {
    pl.homeStreet.clear();
    pl.setHomeStreet("8000 Home Street!!");
    expect(pl.submit.isEnabled()).toBe(false);
    pl.homeStreet.clear();
    pl.setHomeStreet("2200 Astoria Cir");
    expect(pl.submit.isEnabled()).toBe(true);

    pl.homeAddressApt.clear();
    pl.setHomeAddressApt("!@#$%!");
    expect(pl.submit.isEnabled()).toBe(false);
    pl.homeAddressApt.clear();
    pl.setHomeAddressApt("APT 107");
    expect(pl.submit.isEnabled()).toBe(true);

    pl.homeCity.clear();
    pl.setHomeCity("%thisisnotacity");
    expect(pl.submit.isEnabled()).toBe(false);
    pl.homeCity.clear();
    pl.setHomeCity("Herndon");
    expect(pl.submit.isEnabled()).toBe(true);

    pl.homeZipcode.clear();
    pl.setHomeZipcode("fffff");
    expect(pl.submit.isEnabled()).toBe(false);
    pl.homeZipcode.clear();
    pl.setHomeZipcode("20170");
    expect(pl.submit.isEnabled()).toBe(true);

    pl.workStreet.clear();
    pl.setWorkStreet("8000 Work Street!!");
    expect(pl.submit.isEnabled()).toBe(false);
    pl.workStreet.clear();
    pl.setWorkStreet("2200 Astoria Cir");
    expect(pl.submit.isEnabled()).toBe(true);

    pl.workAddressApt.clear();
    pl.setWorkAddressApt("@@@");
    expect(pl.submit.isEnabled()).toBe(false);
    pl.workAddressApt.clear();
    pl.setWorkAddressApt("APT 208");
    expect(pl.submit.isEnabled()).toBe(true);

    pl.workCity.clear();
    pl.setWorkCity("%thisisnotacity");
    expect(pl.submit.isEnabled()).toBe(false);
    pl.workCity.clear();
    pl.setWorkCity("Herndon");
    expect(pl.submit.isEnabled()).toBe(true);

    pl.workZipcode.clear();
    pl.setWorkZipcode("fffff");
    expect(pl.submit.isEnabled()).toBe(false);
    pl.workZipcode.clear();
    pl.setWorkZipcode("20170");
    expect(pl.submit.isEnabled()).toBe(true);

  });


  it("Test 5: Should get a response from the USPS API which is then confirmed.", () => {
    // Enable the submit button
    expect(pl.submit.isEnabled()).toBe(true);

    //Submit the data to API
    pl.submit.click();

    //Check for the "confirm" modal box
    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 5000);
    browser.switchTo().alert().accept();
  });

  it("Test 6: response success message is displayed upon successful submission", ()=>{
    browser.wait(protractor.ExpectedConditions.visibilityOf(pl.httpSuccess), 15000);
    expect(pl.httpSuccess.isDisplayed()).toBe(true);
  })

});
