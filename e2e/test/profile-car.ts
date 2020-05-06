import { browser, element, by, $$ } from "protractor";
import { profileCar } from '../src/profile-car';
import { protractor } from 'protractor/built/ptor';

var pc = new profileCar();

describe("Profile Car Components Tests", () => {
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

  it('Test 1: user should be able to navigate to profile-car', () => {
    browser.waitForAngular();
    browser.ignoreSynchronization=true
    browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id("navbarDropdown"))), 15000);
    element(by.id("navbarDropdown")).click();
    browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id("profileDropdown"))), 15000);
    element(by.id("profileDropdown")).click();
    browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id("contactInfoForm"))), 15000);
    expect(browser.getCurrentUrl()).toBe("http://localhost:4200/profile");
    element(by.id("carInfoButton")).click();
    browser.wait(protractor.ExpectedConditions.visibilityOf(pc.form), 15000);
    expect(pc.form.isPresent()).toBe(true);
  });

  it("Test 2: car form should be pre-populated with user's current info", () => {
    browser.waitForAngular();
    browser.sleep(2500);
    browser.ignoreSynchronization=true
    expect(pc.make.getAttribute("value")).toBeTruthy();
    expect(pc.model.getAttribute("value")).toBeTruthy();
    expect(pc.nrSeats.getAttribute("value")).toBeTruthy();
    expect(pc.avail.getAttribute("value")).toBeTruthy();
  });

  it("Test 3: user cannot submit form without making any changes", () => {
    expect(pc.submit.isEnabled()).toBe(false);
  });

  it("Test 4: available seats can never exceed total seats", () => {
    pc.nrSeats.clear();
    pc.setNrSeats(3);
    pc.avail.clear();
    pc.setAvail(5);
    expect(pc.submit.isEnabled()).toBe(false);

    pc.avail.clear();
    pc.setAvail(2);
    expect(pc.submit.isEnabled()).toBe(true);
  });

  it("Test 5: all form elements must be valid in order to submit ", () => {
    pc.make.clear();
    pc.setMake("Mercedes!");
    expect(pc.submit.isEnabled()).toBe(false);
    pc.make.clear();
    pc.setMake("Nissan");
    expect(pc.submit.isEnabled()).toBe(true);

    pc.model.clear();
    pc.setModel("$300");
    expect(pc.submit.isEnabled()).toBe(false);
    pc.model.clear();
    pc.setModel("Rogue");
    expect(pc.submit.isEnabled()).toBe(true);

    pc.nrSeats.clear();
    pc.setNrSeats(8);
    expect(pc.submit.isEnabled()).toBe(false);
    pc.nrSeats.clear();
    pc.setNrSeats(4);
    expect(pc.submit.isEnabled()).toBe(true);

    pc.avail.clear();
    pc.setAvail(7);
    expect(pc.submit.isEnabled()).toBe(false);
    pc.avail.clear();
    pc.setAvail(4);
    expect(pc.submit.isEnabled()).toBe(true);
  })

})