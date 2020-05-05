import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BsNavbarComponent } from './bs-navbar.component';
import { Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';
import { RegisterComponent } from '../components/register/register.component';
import { DriverComponent } from '../components/driver/driver.component';
import { AdminComponent } from '../components/admin/admin.component';
import { LoginComponent } from '../components/login/login.component';
import { CarRegisterComponent } from '../components/car-register/car-register.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { MyCarComponent } from '../components/my-car/my-car.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { PreferenceComponent } from '../components/preference/preference.component';
import { AdminLoginComponent } from '../components/admin-login/admin-login.component';
import { DriverInfoComponent } from '../components/driver-info/driver-info.component';
import { LandingComponent } from '../components/landing/landing.component';
import { SignupModalComponent } from '../components/sign-up-modal/sign-up-modal.component';
import { LandingPageComponent } from '../components/landing-page/landing-page.component';
import { ProfileContactComponent } from '../components/profile-contact/profile-contact.component';
import { ProfileCarComponent } from '../components/profile-car/profile-car.component';
import { ProfileLocationComponent } from '../components/profile-location/profile-location.component';
import { ProfileMembershipComponent } from '../components/profile-membership/profile-membership.component';
import { DriverContactModalComponent } from '../components/driver-contact-modal/driver-contact-modal.component';
import { DriverListComponent } from '../components/driver-list/driver-list.component';
import { UserRegisterComponent } from '../components/user-register/user-register.component';
import { HomePageComponent } from '../components/home-page/home-page.component';
import { ScheduleComponent } from '../components/schedule/schedule.component';
import { ViewMyRidesComponent } from '../components/view-my-rides/view-my-rides.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { TripsTableComponent } from '../components/trips-table/trips-table.component';
import { AppComponent } from '../app.component';
import { TripsComponent, CreateTripComponent } from '../components/trips/trips.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


describe('BsNavbarComponent', () => {
  let component: BsNavbarComponent;
  let fixture: ComponentFixture<BsNavbarComponent>;

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
      imports: [RouterModule, FormsModule, AppRoutingModule, RouterTestingModule, HttpClientModule, ReactiveFormsModule, ModalModule.forRoot(), NgbModule],
      providers: []
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavbarComponent);
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
