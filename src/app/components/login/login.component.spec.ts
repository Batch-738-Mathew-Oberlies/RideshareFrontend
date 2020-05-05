import { async, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { APP_BASE_HREF } from '@angular/common';
import { AdminComponent } from '../admin/admin.component';
import { CarRegisterComponent } from '../car-register/car-register.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { RegisterComponent } from '../register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyCarComponent } from '../my-car/my-car.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { PreferenceComponent } from '../preference/preference.component';
import { ProfileComponent } from '../profile/profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Batch } from 'src/app/models/batch';
import { DriverComponent } from '../driver/driver.component';
import { AdminLoginComponent } from '../admin-login/admin-login.component';
import { DriverInfoComponent } from '../driver-info/driver-info.component';
import { LandingComponent } from '../landing/landing.component';
import { SignupModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { ProfileContactComponent } from '../profile-contact/profile-contact.component';
import { ProfileCarComponent } from '../profile-car/profile-car.component';
import { ProfileLocationComponent } from '../profile-location/profile-location.component';
import { ProfileMembershipComponent } from '../profile-membership/profile-membership.component';
import { DriverContactModalComponent } from '../driver-contact-modal/driver-contact-modal.component';
import { DriverListComponent } from '../driver-list/driver-list.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { BsNavbarComponent } from 'src/app/bs-navbar/bs-navbar.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ViewMyRidesComponent } from '../view-my-rides/view-my-rides.component';
import { ModalModule } from 'ngx-bootstrap';
import { TripsTableComponent } from '../trips-table/trips-table.component';



describe('LoginComponent', () => {
  let component: LoginComponent;
  // let fixture: ComponentFixture<LoginComponent>;

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
        TripsTableComponent
      ],
       imports: [HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule, RouterTestingModule, ModalModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
      //imports: [HttpClientModule, AppRoutingModule, FormsModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
   const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.showDropDown = false;
    component.curPage = 1;
    component.totalPage = 10;
    component.users = [{ userId: 1,
      userName: 'username',
      batch: {
        batchNumber: 1,
        batchLocation: 'NYC'
      },
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@gmail.com',
      phoneNumber: '9171234567',
      active: true,
      driver: true,
      acceptingRides: true,
      homeAddress:{
        street:"123",
        apt:"",
        city:"Washington",
        state:"VI",
        zip:"12450",
      },
      workAddress:{
        street:"123",
        apt:"",
        city:"Washington",
        state:"VI",
        zip:"12450",
      }
    }]
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change user in login dropdown', () => {
    
    // arrange
    const user = component.users = [{ userId: 1,
      userName: 'username',
      batch: {
        batchNumber: 1,
        batchLocation: 'NYC'
      },
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@gmail.com',
      phoneNumber: '9171234567',
      active: true,
      driver: true,
      acceptingRides: true,
      homeAddress:{
        street:"123",
        apt:"",
        city:"Washington",
        state:"VI",
        zip:"12450",
      },
      workAddress:{
        street:"123",
        apt:"",
        city:"Washington",
        state:"VI",
        zip:"12450",
      }
    }];
      // act
      component.changeUser(user);
      // assert
      expect(component.users).toMatch;
  });

  it('should search account and return a user', () => { 

  });

  it('should toggle dropdown', () => {
    // arrange
    component.showDropDown = false;
    // act
    component.toggleDropDown();
    // assert
    expect(component.showDropDown).toBe(true);
  });

  it('nextPage()', () => {
    component.curPage = 1;
    component.nextPage();
    expect(component.curPage).toBeGreaterThanOrEqual(1);
  });

  it('prevPage()', () => {
    component.curPage = 5;
    component.prevPage();
    expect(component.curPage).toBeLessThan(5);
  });

  it('loginFailed()', () => {
    component.userName = '';
    component.failed = true;
    component.loginFailed();
    expect(component.userName).toBe('');
    expect(component.failed).toBe(true);
  });
  
});
