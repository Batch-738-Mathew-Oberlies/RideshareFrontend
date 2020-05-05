import { browser, element, by, $$ } from "protractor";
import { profileCar } from '../src/profile-car';
import { protractor } from 'protractor/built/ptor';

var pc = new profileCar();

describe("Profile Contact Components Tests", () => {
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
    browser.wait(protractor.ExpectedConditions.visibilityOf(pc.form), 15000);
    expect(browser.getCurrentUrl()).toBe("http://localhost:4200/profile");
    element(by.id("carInfoButton")).click();
    expect(pc.form.isPresent()).toBe(true);
  });

  it("Test 2: contact form should be pre-populated with user's current info", () => {
    browser.waitForAngular();
    browser.ignoreSynchronization=true
    expect(pc.make.getAttribute("value")).toBeTruthy();
    expect(pc.model.getAttribute("value")).toBeTruthy();
    expect(pc.nrSeats.getAttribute("value")).toBeTruthy();
    expect(pc.avail.getAttribute("value")).toBeTruthy();
  });