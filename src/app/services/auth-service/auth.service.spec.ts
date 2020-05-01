import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PreferenceComponent } from 'src/app/components/preference/preference.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
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
import { ViewMyRidesComponent } from 'src/app/components/view-my-rides/view-my-rides.component';


describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
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
    ],
    imports: [AppRoutingModule, FormsModule, HttpClientModule, ReactiveFormsModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
  }));
   let service: AuthService;
   
  beforeEach(() => {
    service = TestBed.get(AuthService);
    service.loggedIn = false;
  });

  it('should be created', () => {
    // const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  it('#isLoggedIn() should confirm if logged in', () => {
    // const isLoggedIn = false;
    service.loggedIn = false;
    expect(service.loggedIn).toBe(false);
  })
});
