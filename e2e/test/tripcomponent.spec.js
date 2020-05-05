describe('User logged in trip component tests', function() {
     // Beginning of elements for the login
     let elLoginButton = element(by.buttonText('Login'));
     let elLoginUsername = element(by.xpath('//*[@id="formGroupExampleInput"]'));
     let elLoginSubmit = element(by.xpath('//*[@id="sign-in-btn"]'));
     let elLoggedInHeader = element(by.xpath('//*[@id="navbarDropdown"]/span'));
     let elSchedule = element(by.css('[routerlink="/schedule"]'));
     let elCreateTripButton = element(by.buttonText('Create a Trip'));
     let elModalName = element(by.css('[formcontrolname="name"]'));
     let elModalSeats = element(by.css('[formcontrolname="availableSeats"]'));
     let elModalDepAddress = element(by.css('[formcontrolname="departure"]'));
     let elModalStreet = element(by.css('[formcontrolname="street"]'));
     let elModalCity = element(by.css('[formcontrolname="city"]'));
     let elModalState = element(by.css('[formcontrolname="state"]'));
     let elModalZip = element(by.css('[formcontrolname="zip"]'));
     let elCalendar = element(by.className('btn btn-outline-secondary calendar'));
     let elMonth = element(by.css('[title="Select month"]'));
     let elYear = element(by.css('[title="Select year"]'));
     let elSelectYear = element(by.css('[value="2028"]'));
     let elDay = element(by.css('.btn-light', '27'));
     let elHours = element(by.css('[placeholder="HH"]'));
     let elMinutes = element(by.css('[placeholder="MM"]'));
     let elMeridies = element(by.buttonText('AM'));
     let elSubmit = element(by.buttonText('Submit'));

     browser.get('http://localhost:4200');

     it('User presses the login button and signs in as the logged-in user', function() {
          elLoginButton.click();
          elLoginUsername.sendKeys('gpichmann0');
          elLoginSubmit.click();
          expect(elLoggedInHeader.getText()).toBe('Grady Pichmann');
      });

     it('User presses schedule on navbar and is taken to the schedule page', function() {
          browser.ignoreSynchronization=true;

          elSchedule.click();

          browser.driver.sleep(3000);

          expect(elCreateTripButton.getText()).toBe('Create a Trip');
     });

     it('User clicks on Create a Trip and creates a trip', function() {
          // browser.ignoreSynchronization=true;

          elCreateTripButton.click();
          elModalName.sendKeys('Gilbert in Space 2');
          elModalSeats.sendKeys('2');
          elModalDepAddress.sendKeys('h');
          elModalStreet.sendKeys("300 E ST SW");
          elModalCity.sendKeys('Washington');
          elModalState.sendKeys('d');
          elModalZip.sendKeys('20546');
          elCalendar.click();

          elMonth.sendKeys('d');
          elYear.click();
          elSelectYear.click();

          elDay.click();
          elHours.sendKeys('9');
          elMinutes.sendKeys('30');
          elMeridies.click();
          elSubmit.click();

          browser.driver.sleep(3000);

          expect(elCreateTripButton.getText()).toBe('Create a Trip');
     });
});
