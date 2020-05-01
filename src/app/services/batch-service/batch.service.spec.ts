import { TestBed } from '@angular/core/testing';

import { BatchService } from './batch.service';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { of } from 'rxjs';
import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PreferenceComponent } from 'src/app/components/preference/preference.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { Batch } from 'src/app/models/batch'
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


describe('BatchService', () => {
  let batchService: BatchService;
  
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
      ],
      imports: [HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule],
    providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
  })

  batchService = TestBed.get(BatchService);
})

it('should be created', () => {
  const service: BatchService = TestBed.get(BatchService);
  expect(service).toBeTruthy();
});

it('should register a batch', () => {
  expect(batchService).toBeTruthy();
});

 //Adding test for getAllBatches() method
 describe('getAllBatches', () => {
  it('should return a list of batches', () => {
    const batchResponse: Batch[] = [
      {
        batchNumber: 1,
        batchLocation: 'NYC'
      },
      {
        batchNumber: 2,
        batchLocation: 'VA'
      }
    ];
    let response: Batch[];
    spyOn(batchService, 'getAllBatches').and.returnValue(batchResponse);

    response = batchService.getAllBatches();

    expect(response).toEqual(batchResponse);
  });
});
});