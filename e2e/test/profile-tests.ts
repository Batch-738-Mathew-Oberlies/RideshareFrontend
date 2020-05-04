import { browser, element, by } from "protractor"

describe("profile component tests", () => {
  browser.get("http://localhost:4200/");
  browser.waitForAngular();
  element(by.id("login-btn")).click();
  element(by.id("formGroupExampleInput")).sendKeys("tcurd9");
  element(by.id("formGroupExampleInput2")).sendKeys("");
  element(by.id("sign-in-btn")).click();
  expect(browser.getCurrentUrl()).toBe("http://localhost:4200/landingPage");

  element(by.id("menuDropdown")).click();
  element(by.id("profileDropdown")).click();
  expect(browser.getCurrentUrl()).toBe("http://localhost:4200/profile");
})