import { browser, element, by, $$ } from "protractor";
import { profileContact } from '../src/profile-contact';
import { protractor } from 'protractor/built/ptor';

var pc = new profileContact();

describe("Profile Contact Components Tests", () => {
  browser.get('http://localhost:4200');

  it('Test 0: user should be able to login', () => {
    element(by.id("login-btn")).click();
    element(by.id("formGroupExampleInput")).sendKeys("tcurd9");
    element(by.id("formGroupExampleInput2")).sendKeys("");
    element(by.id("sign-in-btn")).click();
    expect(browser.getCurrentUrl()).toBe("http://localhost:4200/landingPage");
  });
  
  browser.driver.sleep(2500);

  it('Test 1: user should be able to navigate to profile-car', () => {
    browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id("navbarDropdown"))), 10000);
    element(by.id("navbarDropdown")).click();
    // browser.driver.sleep(5000);
    browser.wait(protractor.ExpectedConditions.visibilityOf(element(by.id("profileDropdown"))), 15000);
    element(by.id("profileDropdown")).click();
    expect(browser.getCurrentUrl()).toBe("http://localhost:4200/profile");

    element(by.id("contactButton")).click();
    expect(pc.form.isPresent()).toBe(true);
  });

  it("Test 2: contact form should be pre-populated with user's current info", () => {
    expect(pc.firstName.getAttribute("value")).toBeTruthy();
    expect(pc.lastName.getAttribute("value")).toBeTruthy();
    expect(pc.email.getAttribute("value")).toBeTruthy();
    expect(pc.phone.getAttribute("value")).toBeTruthy();
  });

  it("Test 3: user cannot submit form without making any changes", () => {
    expect(pc.submit.isEnabled()).toBe(false);
  });

  it("Test 4: submit button is only enabled when info is changed and valid", () => {
    pc.firstName.clear();
    pc.setFirstName("Toby!");
    expect(pc.submit.isEnabled()).toBe(false);
    pc.firstName.clear();
    pc.setFirstName("Toby2");
    expect(pc.submit.isEnabled()).toBe(false);
    pc.firstName.clear();
    pc.setFirstName("Tobsy");
    expect(pc.submit.isEnabled()).toBe(true);

    pc.lastName.clear();
    pc.setLastName("Curd!");
    expect(pc.submit.isEnabled()).toBe(false);
    pc.lastName.clear();
    pc.setLastName("Curd2");
    expect(pc.submit.isEnabled()).toBe(false);
    pc.lastName.clear();
    pc.setLastName("Curdsy");
    expect(pc.submit.isEnabled()).toBe(true);

    pc.email.clear();
    pc.setEmail("tcurd9illinoisedu");
    expect(pc.submit.isEnabled()).toBe(false);
    pc.email.clear();
    pc.setEmail("tcurd9illinois.edu");
    expect(pc.submit.isEnabled()).toBe(false);
    pc.email.clear();
    pc.setEmail("tcurd9@illinoisedu");
    expect(pc.submit.isEnabled()).toBe(false);
    pc.email.clear();
    pc.setEmail("tcurd10@illinois.edu");
    expect(pc.submit.isEnabled()).toBe(true);

    pc.phone.clear();
    pc.setPhoneNumber("6469198957");
    expect(pc.submit.isEnabled()).toBe(false);
    pc.phone.clear();
    pc.setPhoneNumber("646-919-89570");
    expect(pc.submit.isEnabled()).toBe(false);
    pc.phone.clear();
    pc.setPhoneNumber("646-919");
    expect(pc.submit.isEnabled()).toBe(false);
    pc.phone.clear();
    pc.setPhoneNumber("646-919-8958");
    expect(pc.submit.isEnabled()).toBe(true);
  })
})