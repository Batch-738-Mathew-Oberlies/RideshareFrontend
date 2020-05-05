import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { RegisterComponent } from '../register/register.component';
import { DriverComponent } from '../driver/driver.component';
import { AdminComponent } from '../admin/admin.component';
import { LoginComponent } from '../login/login.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { MyCarComponent } from '../my-car/my-car.component';
import { ProfileComponent } from '../profile/profile.component';
import { PreferenceComponent } from '../preference/preference.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { DriverInfoComponent } from '../driver-info/driver-info.component';
import { SignupModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { ProfileContactComponent } from '../profile-contact/profile-contact.component';
import { ProfileCarComponent } from '../profile-car/profile-car.component';
import { ProfileLocationComponent } from '../profile-location/profile-location.component';
import { ProfileMembershipComponent } from '../profile-membership/profile-membership.component';
//import { DriverContactModalComponent } from '../driver-contact-modal/driver-contact-modal.component';
import { DriverListComponent } from '../driver-list/driver-list.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { BsNavbarComponent } from 'src/app/bs-navbar/bs-navbar.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ViewMyRidesComponent } from '../view-my-rides/view-my-rides.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from 'ngx-bootstrap';
import { TripsTableComponent } from '../trips-table/trips-table.component';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

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
        //DriverContactModalComponent,
        DriverListComponent,
        UserRegisterComponent,
        HomePageComponent,
        BsNavbarComponent,
        ScheduleComponent,
        ViewMyRidesComponent,
        TripsTableComponent
      ],
      imports: [HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule, RouterTestingModule, ModalModule.forRoot()],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
