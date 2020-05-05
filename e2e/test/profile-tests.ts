import { browser, element, by } from "protractor"

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

 

  // Profile button IDs contactButton, locationButton, membershipButton, carInfoButton

  it("Test 1: Profile Contact Info form is prefilled with information", () => {
    element(by.id("contactButton")).click();
    expect(element(by.id("firstName")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("lastName")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("email")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("phone")).getAttribute("value")).toBeTruthy();
  });

  it("Test 2: Profile Contact info form shows appropriate error messages", () => {
    //firstName
    element(by.id("firstName")).sendKeys("");
    expect(element(by.css("error")).isPresent()).toBe(true);

    element(by.id("firstName")).sendKeys("Toby!");
    expect(element(by.css("error")).isPresent()).toBe(true);

    element(by.id("firstName")).sendKeys("Toby2");
    expect(element(by.css("error")).isPresent()).toBe(true);

    //lastName
    element(by.id("lastName")).sendKeys("");
    expect(element(by.css("error")).isPresent()).toBe(true);

    element(by.id("lastName")).sendKeys("Curd!");
    expect(element(by.css("error")).isPresent()).toBe(true);

    element(by.id("lastName")).sendKeys("Curd2");
    expect(element(by.css("error")).isPresent()).toBe(true);

    //email
    element(by.id("email")).sendKeys("");
    expect(element(by.css("error")).isPresent()).toBe(true);

    element(by.id("email")).sendKeys("email");
    expect(element(by.css("error")).isPresent()).toBe(true);

    //phone
    element(by.id("phone")).sendKeys("");
    expect(element(by.css("error")).isPresent()).toBe(true);

    element(by.id("phone")).sendKeys("123");
    expect(element(by.css("error")).isPresent()).toBe(true);

    element(by.id("phone")).sendKeys("123ABC");
    expect(element(by.css("error")).isPresent()).toBe(true);

  })

  it("Test #: Profile Location form is prefilled with information", () => {
    element(by.id("locationButton")).click();
    expect(element(by.id("homeStreet")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("homeAddressApt")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("homeCity")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("homeState")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("homeZipcode")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("workStreet")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("workAddressApt")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("workCity")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("workState")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("workZipcode")).getAttribute("value")).toBeTruthy();

  });



  it("Test #: Profile Membership form is prefilled with information", () => {
    element(by.id("membershipButton")).click();
    expect(element(by.id("isDriver")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("isActive")).getAttribute("value")).toBeTruthy();

  });



  it("Test #: Profile Car form is prefilled with information", () => {
    element(by.id("carInfoButton")).click();
    expect(element(by.id("make")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("model")).getAttribute("value")).toBeTruthy();
    expect(element(by.id("nrSeats")).getAttribute("value")).toBeTruthy();

  });
})