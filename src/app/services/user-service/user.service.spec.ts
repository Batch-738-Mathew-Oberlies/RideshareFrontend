import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { of } from 'rxjs';
import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PreferenceComponent } from 'src/app/components/preference/preference.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { User } from 'src/app/models/user';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { ViewMyRidesComponent } from 'src/app/components/view-my-rides/view-my-rides.component';
import { DriverComponent } from 'src/app/components/driver/driver.component';
import { AdminLoginComponent } from 'src/app/components/admin-login/admin-login.component';
import { DriverInfoComponent } from 'src/app/components/driver-info/driver-info.component';
import { LandingComponent } from 'src/app/components/landing/landing.component';
import { SignupModalComponent } from 'src/app/components/sign-up-modal/sign-up-modal.component';
import { LandingPageComponent } from 'src/app/components/landing-page/landing-page.component';
import { ProfileContactComponent } from 'src/app/components/profile-contact/profile-contact.component';
import { ProfileCarComponent } from 'src/app/components/profile-car/profile-car.component';
import { ProfileLocationComponent } from 'src/app/components/profile-location/profile-location.component';
import { ProfileMembershipComponent } from 'src/app/components/profile-membership/profile-membership.component';
import { DriverContactModalComponent } from 'src/app/components/driver-contact-modal/driver-contact-modal.component';
import { DriverListComponent } from 'src/app/components/driver-list/driver-list.component';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { BsNavbarComponent } from 'src/app/bs-navbar/bs-navbar.component';
import { ScheduleComponent } from 'src/app/components/schedule/schedule.component';
import { Router } from '@angular/router';
import { TripsTableComponent } from 'src/app/components/trips-table/trips-table.component';


describe('UserService', () => {
  let userService: UserService;

  // Adding injection here instead of it() method to reduce redundancy
  beforeEach(() => { 
   TestBed.configureTestingModule({
    declarations: [
      RegisterComponent,
      DriverComponent,
      AdminComponent,
      LoginComponent,
      CarRegisterComponent,
      LoginComponent,
      NavbarComponent,
      MyCarComponent,
      ProfileComponent,
      PreferenceComponent,
      AdminLoginComponent,
      DriverInfoComponent,
      LandingComponent,
      SignupModalComponent,
      LandingPageComponent,
      ProfileContactComponent,
      ProfileCarComponent,
      ProfileLocationComponent,
      ProfileMembershipComponent,
      DriverContactModalComponent,
      DriverListComponent,
      UserRegisterComponent,
      HomePageComponent,
      BsNavbarComponent,
      ScheduleComponent,
      ViewMyRidesComponent,
      TripsTableComponent
    ],
    imports: [HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
   }); 
    
    userService = TestBed.get(UserService);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should create a user', () => {
    expect(userService).toBeTruthy();
  });

  //Adding test for getAllUsers() method
  describe('getAllUsers', () => {
    it('should return a collection of users', () => {
      const userResponse: User[] = [
        {
          userId: 1,
          userName: 'carsryan',
          batch: {
            batchNumber: 1,
            batchLocation: '123'
          },
          firstName: 'Ryan',
          lastName: 'Carstons',
          email: 'ryan@gmail.com',
          phoneNumber: '1231231231',
          driver: true,
          active: true,
          acceptingRides: true,
          homeAddress: {
            street: "123 Fake St.",
            apt: "123",
            city: "Tulsa",
            state: "Oklahoma",
            zip: "12345"
          },
          workAddress: {
            street: "123 Fake St.",
            apt: "123",
            city: "Tulsa",
            state: "Oklahoma",
            zip: "12345"
          }
        },
        {
          userId: 2,
          userName: 'pwin',
          batch: {
            batchNumber: 2,
            batchLocation: '456'
          },
          firstName: 'Peter',
          lastName: 'Nguyen',
          email: 'pete@gmail.com',
          phoneNumber: '3213213213',
          driver: true,
          active: true,
          acceptingRides: true,
          homeAddress: {
            street: "123 Fake St.",
            apt: "123",
            city: "Tulsa",
            state: "Oklahoma",
            zip: "12345"
          },
          workAddress: {
            street: "123 Fake St.",
            apt: "123",
            city: "Tulsa",
            state: "Oklahoma",
            zip: "12345"
          }
        }
      ];
      let response;
      spyOn(userService, 'getAllUsers').and.returnValue(of(userResponse));

      userService.getAllUsers().subscribe(res => {
        response = res;
      });

      expect(response).toEqual(userResponse);
    });
  });
  
});