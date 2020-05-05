import { TestBed } from '@angular/core/testing';

import { TripService } from './trip.service';
import { AppComponent } from 'src/app/app.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { DriverComponent } from 'src/app/components/driver/driver.component';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { PreferenceComponent } from 'src/app/components/preference/preference.component';
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
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { BsNavbarComponent } from 'src/app/bs-navbar/bs-navbar.component';
import { TripsComponent, CreateTripComponent } from 'src/app/components/trips/trips.component';
import { ScheduleComponent } from 'src/app/components/schedule/schedule.component';
import { ViewMyRidesComponent } from 'src/app/components/view-my-rides/view-my-rides.component';
import { TripsTableComponent } from 'src/app/components/trips-table/trips-table.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('TripService', () => {
  let service: TripService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
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
        TripsComponent,
        CreateTripComponent,
        ScheduleComponent,
        ViewMyRidesComponent,
        TripsTableComponent,
      ],
      imports: [HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule, NgbModule],
    });
  });

  it('should be created', () => {
    const service: TripService = TestBed.get(TripService);
    expect(service).toBeTruthy();
  });
});
