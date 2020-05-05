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


    it("Test 1: user cannot submit form without making any changes", () => {
      expect(pc.submit.isEnabled()).toBe(false);
    });

    it("Test 2: Profile Membership form is prefilled with information", () => {
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


    it("Test 3: Invalid form control entries.", ()=>{

      element(by.id("locationButton")).click();

      pl.setHomeStreet("8000 Home Street!!");
      expect(pl.submit.isEnabled()).toBe(false);
      pl.homeStreet.clear();
      pl.setHomeStreet("8000 Test Street");
      expect(pl.submit.isEnabled()).toBe(true);
      pl.homeStreet.clear();

      pl.setHomeAddressApt("!@#$%!");
      expect(pl.submit.isEnabled()).toBe(false);
      pl.homeAddressApt.clear();
      pl.setHomeAddressApt("APT 111");
      expect(pl.submit.isEnabled()).toBe(true);
      pl.homeAddressApt.clear();

      pl.setHomeCity("%thisisnotacity");
      expect(pl.submit.isEnabled()).toBe(false);
      pl.homeCity.clear();
      pl.setHomeCity("Charlottesville");
      expect(pl.submit.isEnabled()).toBe(true);
      pl.homeCity.clear();


      pl.setHomeZipcode("fffff");
      expect(pl.submit.isEnabled()).toBe(false);
      pl.homeZipcode.clear();
      pl.setHomeZipcode("12345");
      expect(pl.submit.isEnabled()).toBe(true);
      pl.homeZipcode.clear();

      pl.setWorkStreet("8000 Work Street!!");
      expect(pl.submit.isEnabled()).toBe(false);
      pl.workStreet.clear();
      pl.setWorkStreet("8000 Work Test Street");
      expect(pl.submit.isEnabled()).toBe(true);
      pl.workStreet.clear();

      pl.setWorkAddressApt("@@@");
      expect(pl.submit.isEnabled()).toBe(false);
      pl.workAddressApt.clear();
      pl.setWorkAddressApt("APT 222");
      expect(pl.submit.isEnabled()).toBe(true);
      pl.workAddressApt.clear();

      pl.setWorkCity("%thisisnotacity");
      expect(pl.submit.isEnabled()).toBe(false);
      pl.workCity.clear();
      pl.setWorkCity("Charlottesville");
      expect(pl.submit.isEnabled()).toBe(true);
      pl.workCity.clear();


      pl.setWorkZipcode("fffff");
      expect(pl.submit.isEnabled()).toBe(false);
      pl.workZipcode.clear();
      pl.setWorkZipcode("12345");
      expect(pl.submit.isEnabled()).toBe(true);
      pl.workZipcode.clear();
    });
});
