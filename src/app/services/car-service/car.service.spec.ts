import { TestBed } from '@angular/core/testing';
import { CarService } from './car.service';
import { AdminComponent } from 'src/app/components/admin/admin.component';
import { CarRegisterComponent } from 'src/app/components/car-register/car-register.component';
import { UserRegisterComponent } from 'src/app/components/user-register/user-register.component';
import { RegisterComponent } from 'src/app/components/register/register.component';
import { LoginComponent } from 'src/app/components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { of } from 'rxjs';
import { MyCarComponent } from 'src/app/components/my-car/my-car.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PreferenceComponent } from 'src/app/components/preference/preference.component';
import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { Car } from 'src/app/models/car'
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
import { RouterTestingModule } from '@angular/router/testing';
import { TripsTableComponent } from 'src/app/components/trips-table/trips-table.component';



  describe('CarService', () => {
    let carService: CarService;
    
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
         imports: [HttpClientModule, AppRoutingModule, FormsModule, ReactiveFormsModule, RouterTestingModule],
      providers: [{provide: APP_BASE_HREF, useValue: '/my/app'}]
    })

    carService = TestBed.get(CarService);
  })

  it('should be created', () => {
    const service: CarService = TestBed.get(CarService);
    expect(service).toBeTruthy();
  });

  it('should register a car', () => {
    expect(carService).toBeTruthy();
  });

    //Adding test for getAllCars() method
    describe('getAllCars', () => {
      it('should return a collection of cars', () => {
        const carsResponse: Car[] = [
          {
            carId: 1,
            color: 'black',
            seats: 6,
            make: 'Tesla',
            model: 'Model X',
            year: 2019,
            user: {
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
            }
          },    
          {
            carId: 2,
            color: 'white',
            seats: 4,
            make: 'Toyota',
            model: 'Supra',
            year: 2019,
            user: {
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
            }  
        ];
        let response;
        spyOn(carService, 'getAllCars').and.returnValue(of(carsResponse));
  
        carService.getAllCars().subscribe(res => {
          response = res;
        });
  
        expect(response).toEqual(carsResponse);
      });
    });
});
