
describe('User logged in trip component tests', function(){
     //beginning of elements for the login
     let elLoginButton = element(by.buttonText('Login'));
     let elLoginUsername = element(by.xpath('//*[@id="formGroupExampleInput"]'));
     let elLoginPassword = element(by.xpath('//*[@id="formGroupExampleInput2"]'));
     let elLoginSubmit = element(by.xpath('//*[@id="sign-in-btn"]'));
     let elLoggedInHeader = element(by.xpath('//*[@id="navbarDropdown"]/span'));
     let elHamburger = element(by.css('[class="navbar-toggler-icon"]'));
     let elTripo = element(by.css('[routerlink="/trips"]'));
     let elTripTitle = element(by.id('tripList'));
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
     let elSelectMonth = element(by.css('[value="12"]'));
     let elYear = element(by.css('[title="Select year"]'));
     let elSelectYear = element(by.css('[value="2028"]'));
     let elDay = element(by.css('.btn-light', '27'));
     let elHours = element(by.css('[placeholder="HH"]'));
     let elMinutes = element(by.css('[placeholder="MM"]'));
     let elMeridies = element(by.buttonText('AM'));
     let elSubmit = element(by.buttonText('Submit'));


     browser.get('http://localhost:4200');


     //beg
     it('User Presses the login button and signs in as the logged in user', function(){
          // browser.driver.manage().window().setSize(xComp,y);
          elLoginButton.click();
          //These are based off of dummy data currently. Change if desired
          elLoginUsername.sendKeys('gpichmann0');
          elLoginSubmit.click();
          //change this to reflect succesful login
          expect(elLoggedInHeader.getText()).toBe('Grady Pichmann');
      });

     it('User Presses trip on navbar and is taken to the trip page', function(){

          browser.ignoreSynchronization=true;
   
          elTripo.click();

          expect(elTripTitle.getText()).toBe('List of Trips');
     });

     it('User clicks on Create a Trip and creates a trip', function(){

          browser.ignoreSynchronization=true;
   
          elCreateTripButton.click();
          elModalName.sendKeys('GameStop');
          elModalSeats.sendKeys('2');
          elModalDepAddress.sendKeys('h');
          elModalStreet.sendKeys("20505 S Dixie Hwy");
          elModalCity.sendKeys('Miami');
          elModalState.sendKeys('f');
          elModalZip.sendKeys('33189');
          elCalendar.click();

          elMonth.sendKeys('d');
          elYear.click();
          elSelectYear.click();

          elDay.click();
          elHours.sendKeys('9');
          elMinutes.sendKeys('30');
          elMeridies.click();
          elSubmit.click();

          browser.pause();
          expect(elTripTitle.getText()).toBe('List of Trips');
     });
});