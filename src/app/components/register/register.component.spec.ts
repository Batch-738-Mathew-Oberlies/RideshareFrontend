import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { AdminComponent } from '../admin/admin.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { LoginComponent } from '../login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { MyCarComponent } from '../my-car/my-car.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ProfileComponent } from '../profile/profile.component';
import { DriverInfoComponent } from '../driver-info/driver-info.component';
import { DriverComponent } from '../driver/driver.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { SignupModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { DriverListComponent } from '../driver-list/driver-list.component';
import { ProfileContactComponent } from '../profile-contact/profile-contact.component';
import { ProfileCarComponent } from '../profile-car/profile-car.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileMembershipComponent } from '../profile-membership/profile-membership.component';
import { ProfileLocationComponent } from '../profile-location/profile-location.component';
import { DriverContactModalComponent } from '../driver-contact-modal/driver-contact-modal.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { ViewMyRidesComponent } from '../view-my-rides/view-my-rides.component';
import { BsNavbarComponent } from 'src/app/bs-navbar/bs-navbar.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { LandingComponent } from '../landing/landing.component';
import { TripsTableComponent } from '../trips-table/trips-table.component';
import { AppComponent } from 'src/app/app.component';
import { TripsComponent, CreateTripComponent } from '../trips/trips.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
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

      imports: [ RouterModule, RouterTestingModule, HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule, NgbModule],
      providers: [{provide: Router, useClass: RouterStub}]
        })
    .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  class RouterStub {
    navigateByUrl(url: string) {
      return url;
    }
  }
});
