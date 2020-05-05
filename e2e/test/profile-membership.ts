import { browser, element, by } from "protractor"
import { profileMembership } from '../src/profile-membership';

var pm = new profileMembership();

describe("Profile Membership Component Tests", () => {
  browser.get("http://localhost:4200/");
  browser.waitForAngular();
  element(by.id("login-btn")).click();
  element(by.id("formGroupExampleInput")).sendKeys("tcurd9");
  element(by.id("formGroupExampleInput2")).sendKeys("");
  element(by.id("sign-in-btn")).click();
  // expect(browser.getCurrentUrl()).toBe("http://localhost:4200/landingPage");

  it("Test 0: Navigate to profile page", () => {
    element(by.id("navbarDropdown")).click();
    browser.sleep(1000);
    element(by.id("profileDropdown")).click();
    expect(browser.getCurrentUrl()).toBe("http://localhost:4200/profile");
  })

  it("Test 1: Profile Membership form is prefilled with information", () => {
    element(by.id("membershipButton")).click();
    expect(pm.driver.getAttribute("value")).toBeTruthy();
    expect(pm.active.getAttribute("value")).toBeTruthy();
    expect(pm.no.isEnabled()).toBe(false);
    expect(pm.yes.isEnabled()).toBe(true);
  })

  it("Test 2: Submit button is disabled when values are the same", () => {
    expect(pm.submit.isEnabled()).toBe(false);
  })


  it("Test 3: Driver acceptingRides buttons display toggle", ()=>{

    pm.setDriver(false);
    expect(pm.submit.isEnabled()).toBe(true); //submit button enabled
    expect(pm.yes.isDisplayed()).toBe(false); // acceptingRides 'yes' button is not displayed
    expect(pm.no.isDisplayed()).toBe(false); // acceptingRides 'no' button is not displayed

    pm.setDriver(true);
    expect(pm.submit.isEnabled()).toBe(true); //submit button enabled
    expect(pm.yes.isDisplayed()).toBe(true); // acceptingRides 'yes' button is displayed
    expect(pm.no.isDisplayed()).toBe(true); // acceptingRides 'no' button is displayed

  })

  it("Test 4: Successful form data send", ()=>{
    // toggle a form field to enable the submit button
    pm.setActive(false);
    pm.setActive(true);
    expect(pm.submit.isEnabled()).toBe(true);

    //submit the form data
    pm.submit.click();

    browser.waitForAngular(); //wait for the http request / response to complete

    // response success message is displayed
    expect(element(by.id("response-success")).isDisplayed()).toBe(true);

  })



})

