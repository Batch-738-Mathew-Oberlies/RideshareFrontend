import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { NgbModule, NgbModalRef, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TripsComponent, CreateTripComponent } from './trips.component';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
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
import { LandingComponent } from '../landing/landing.component';
import { SignupModalComponent } from '../sign-up-modal/sign-up-modal.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';
import { ProfileContactComponent } from '../profile-contact/profile-contact.component';
import { ProfileCarComponent } from '../profile-car/profile-car.component';
import { ProfileLocationComponent } from '../profile-location/profile-location.component';
import { ProfileMembershipComponent } from '../profile-membership/profile-membership.component';
import { DriverListComponent } from '../driver-list/driver-list.component';
import { UserRegisterComponent } from '../user-register/user-register.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { BsNavbarComponent } from 'src/app/bs-navbar/bs-navbar.component';
import { ScheduleComponent } from '../schedule/schedule.component';
import { ViewMyRidesComponent } from '../view-my-rides/view-my-rides.component';
import { TripsTableComponent } from '../trips-table/trips-table.component';
import { ModalModule } from 'ngx-bootstrap';

fdescribe('TripsComponent', () => {
  let comp: TripsComponent;
  let create: CreateTripComponent;
  let fixture: ComponentFixture<TripsComponent>;
  let create: CreateTripComponent;
  let createFixture: ComponentFixture<CreateTripComponent>;
  let modalService: NgbModal;
  let modalRef: NgbModalRef;
  const formBuilder: FormBuilder = new FormBuilder();

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
        DriverListComponent,
        UserRegisterComponent,
        HomePageComponent,
        BsNavbarComponent,
        TripsComponent,
        CreateTripComponent,
        ScheduleComponent,
        ViewMyRidesComponent,
        TripsTableComponent,
        CreateTripComponent,
       ],
      imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ModalModule.forRoot(),
        NgbModule,
        ReactiveFormsModule,
      ],
      providers: [NgbActiveModal,
        { provide: FormBuilder, useValue: formBuilder }
      ]
    })
    .compileComponents().then(() => {fixture = TestBed.createComponent(TripsComponent);
                                     comp = fixture.componentInstance; // TripComponent test instance
                                     create = createFixture.componentInstance; // Trip Scheduler Modal
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripsComponent);
    comp = fixture.componentInstance;
    comp.user = JSON.parse(`{"userId":3,"userName":"gpichmann0","batch":{"batchNumber":1,"batchLocation":"Morgantown"},"firstName":"Grady","lastName":"Pichmann","email":"gpichmann0@artisteer.com","phoneNumber":"212-374-3466","driver":true,"active":true,"acceptingRides":true,"homeAddress":{"id":22,"street":"20505 S Dixie Hwy","apt":null,"city":"Miami","state":"FL","zip":"33189"},"workAddress":{"id":9,"street":"Sad","apt":null,"city":"Inbetween","state":"AL","zip":"11111"}}`);
    createFixture = TestBed.createComponent(CreateTripComponent);
    create = createFixture.componentInstance;
    create.user = comp.user;
    create.tripModalForm = formBuilder.group({
      name: [''],
      date: [''],
      apartment: [''],
      departure: [''],
      street: [''],
      city: [''],
      state: [''],
      zip: [''],
      availableSeats: [''],
      time: ['']
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(comp).toBeTruthy();
  });

  it(`should have this.user.driver is true`, async(() => {
    fixture = TestBed.createComponent(TripsComponent);
    comp = fixture.debugElement.componentInstance;
    expect(comp.user.driver).toBeTruthy();
  }));

  it(`should set submitted to true`, async(() => {
    create.submit();
    expect(create.submitted).toBeTruthy();
  }));

  it(`should call the submit method`, async(() => {
    modalService = TestBed.get(NgbModal);

    comp.open(comp.user);
    fixture.detectChanges();

    const submitSpy = spyOn(create, 'submit').and.callThrough();

    create.submit();
    expect(submitSpy).toHaveBeenCalled();

  }));

  it(`should call the toggleMeridian method`, async(() => {
    create.toggleMeridian();
    expect(create.meridian).toBeFalsy();
  }));

  it(`form should be invalid`, async(() => {
    create.tripModalForm.controls.name.setValue('');
    create.tripModalForm.controls.availableSeats.setValue('');
    create.tripModalForm.controls.departure.setValue('');
    create.tripModalForm.controls.street.setValue('');
    create.tripModalForm.controls.city.setValue('');
    create.tripModalForm.controls.state.setValue('');
    create.tripModalForm.controls.zip.setValue('');
    create.tripModalForm.controls.date.setValue('');
    create.tripModalForm.controls.time.setValue('');
    expect(create.tripModalForm.invalid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    create.tripModalForm.controls.name.setValue('ja@ja.com');
    create.tripModalForm.controls.availableSeats.setValue('4');
    create.tripModalForm.controls.departure.setValue('5 Carpenter Plaza, New York City, NY 10275');
    create.tripModalForm.controls.street.setValue('37471 Stonegate Ln');
    create.tripModalForm.controls.city.setValue('Palmdale');
    create.tripModalForm.controls.state.setValue('CA');
    create.tripModalForm.controls.zip.setValue('93552');
    create.tripModalForm.controls.date.setValue('2020-05-05');
    create.tripModalForm.controls.time.setValue('13:30:25');
    expect(create.tripModalForm.valid).toBeTruthy();
  }));
});
