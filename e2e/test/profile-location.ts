import { browser, element, by } from "protractor";
import { ProfileLocation } from "../src/profile-location";

var pl = new ProfileLocation();

describe("Profile Location Components Tests", () => {
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
    });
  
    it("Test 1: Profile Membership form is prefilled with information", () => {
      element(by.id("locationButton")).click();
      expect(pl.homeStreet.getAttribute("value")).toBeTruthy();
      expect(pl.homeAddressApt.getAttribute("value")).toBeTruthy();
      expect(pl.homeCity.getAttribute("value")).toBeTruthy();
      //expect(pl.homeState.getAttribute("value")).toBeTruthy();
      expect(pl.homeZipcode.getAttribute("value")).toBeTruthy();

      expect(pl.workStreet.getAttribute("value")).toBeTruthy();
      expect(pl.workAddressApt.getAttribute("value")).toBeTruthy();
      expect(pl.workCity.getAttribute("value")).toBeTruthy();
      //expect(pl.workState.getAttribute("value")).toBeTruthy();
      expect(pl.workZipcode.getAttribute("value")).toBeTruthy();
    });

//     it("Test 2: Invalid form control entries.", ()=>{
// 
//     });
});