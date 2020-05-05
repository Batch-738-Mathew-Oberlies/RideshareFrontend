import { browser, element, by } from "protractor"
import { profileMembership } from '../src/profile-membership';

var pm = new profileMembership();

describe("profile component tests", () => {
  browser.get("http://localhost:4200/");
  browser.waitForAngular();
  element(by.id("login-btn")).click();
  element(by.id("formGroupExampleInput")).sendKeys("tcurd9");
  element(by.id("formGroupExampleInput2")).sendKeys("");
  element(by.id("sign-in-btn")).click();
  // expect(browser.getCurrentUrl()).toBe("http://localhost:4200/landingPage");

  it("Test 0: Why wont you work", () => {
    element(by.id("navbarDropdown")).click();
    browser.sleep(1000);
    element(by.id("profileDropdown")).click();
    expect(browser.getCurrentUrl()).toBe("http://localhost:4200/profile");
  })

  it("Test #: Profile Membership form is prefilled with information", () => {
    element(by.id("membershipButton")).click();
    expect(pm.driver.getAttribute("value")).toBeTruthy();
    expect(pm.active.getAttribute("value")).toBeTruthy();
    expect(pm.no.isEnabled()).toBe(false);
    expect(pm.yes.isEnabled()).toBe(true);
  })

  it("Test : submit button is disabled when values are the same", () => {
    expect(pm.submit.isEnabled()).toBe(false);
  })

})

