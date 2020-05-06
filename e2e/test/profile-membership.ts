import { browser, element, by, protractor } from "protractor"
import { profileMembership } from '../src/profile-membership';

var pm = new profileMembership();

describe("Profile Membership Component Tests", () => {
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
    element(by.id("membershipButton")).click();
    expect(element(by.id("membershipDiv")).isPresent()).toBe(true);
  });

  it("Test 2: Profile Membership form is prefilled with information", () => {
    browser.waitForAngular();
    browser.sleep(2500);
    browser.ignoreSynchronization=true;

    expect(pm.driver.getAttribute("value")).toBeTruthy();
    expect(pm.active.getAttribute("value")).toBeTruthy();
  })

  it("Test 3: Submit button is disabled when values are the same", () => {
    expect(pm.submit.isEnabled()).toBe(false);
  })

  it("Test 4: Driver acceptingRides buttons display toggle", () => {
    pm.setDriver("Rider");
    expect(pm.driver.getAttribute("value")).toBe("false");
    expect(pm.acceptingRides.isPresent()).toBe(false);

    pm.setDriver("Driver");
    expect(pm.driver.getAttribute("value")).toBe("true");
    browser.wait(protractor.ExpectedConditions.visibilityOf(pm.acceptingRides), 15000);
    expect(pm.acceptingRides.isPresent()).toBe(true);
  })

  it("Test 5: Successful form data send", () => {
    pm.active.getAttribute("value").then(function(value) {
      if (value == "true") {
        pm.setActive("Inactive");
        expect(pm.active.getAttribute("value")).toBe("false");
      } else {
        pm.setActive("Active");
        expect(pm.active.getAttribute("value")).toBe("true");
      }
    })
    pm.submit.click();

    browser.wait(protractor.ExpectedConditions.visibilityOf(pm.httpSuccess), 15000);
    expect(pm.httpSuccess.isDisplayed()).toBe(true);
  })

})

