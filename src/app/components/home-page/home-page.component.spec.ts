import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageComponent } from './home-page.component';
import { LoginComponent } from '../login/login.component';
import { SignupModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService, ComponentLoaderFactory, PositioningService } from 'ngx-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { RegisterComponent } from '../register/register.component';
import { DriverComponent } from '../driver/driver.component';
import { AdminComponent } from '../admin/admin.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MyCarComponent } from '../my-car/my-car.component';
import { ProfileComponent } from '../profile/profile.component';
import { PreferenceComponent } from '../preference/preference.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { DriverInfoComponent } from '../driver-info/driver-info.component';
import { LandingComponent } from '../landing/landing.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { ProfileContactComponent } from '../profile-contact/profile-contact.component';
import { ProfileCarComponent } from '../profile-car/profile-car.component';
import { ProfileLocationComponent } from '../profile-location/profile-location.component';
import { ProfileMembershipComponent } from '../profile-membership/profile-membership.component';
import { DriverContactModalComponent } from '../driver-contact-modal/driver-contact-modal.component';
import { DriverListComponent } from '../driver-list/driver-list.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { BsNavbarComponent } from 'src/app/bs-navbar/bs-navbar.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ViewMyRidesComponent } from '../view-my-rides/view-my-rides.component';

describe('HomePageComponent', () => {
  let component: HomePageComponent;
  let fixture: ComponentFixture<HomePageComponent>;

  beforeEach(async(() => {
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
      ],
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule, AppRoutingModule, RouterTestingModule],
      providers: [BsModalService, ComponentLoaderFactory, PositioningService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
