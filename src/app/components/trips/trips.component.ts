import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'src/app/models/trip';
import { Car } from 'src/app/models/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
import {NgbDateStruct, NgbCalendar, NgbInputDatepicker} from '@ng-bootstrap/ng-bootstrap';
import {TripService} from '../../services/trip-service/trip.service';
import {UserService} from '../../services/user-service/user.service';
import {BehaviorSubject} from 'rxjs';
import { CarService } from 'src/app/services/car-service/car.service';

@Component({
  selector: 'app-create-trip-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Create Trip</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form [formGroup]="tripModalForm">
        <div class="form-group">
          <label for="name">Name</label><br>
          <input type="text" formControlName="name" id="createTripName" [ngClass]="{ 'is-invalid': submitted && controls.name.errors }"/>
          <div *ngIf="submitted && controls.name.errors" class="invalid-feedback">
              <div *ngIf="this.tripModalForm.controls.name.errors?.required">Name is required</div>
          </div>
        </div>
        <div class="form-group">
          <label for="availableSeats">Available Seats</label><br>
          <select formControlName="availableSeats" id="createTripSeats" [ngClass]="{ 'is-invalid': submitted && controls.availableSeats.errors }">
            <option value="">Choose number of available seats</option>
            <option *ngFor="let num of this.numberArray" [value]="num">{{num}}</option>
          </select>
          <div *ngIf="submitted && controls.availableSeats.errors" class="invalid-feedback">
              <div *ngIf="controls.availableSeats.errors?.required">Please select a number of available seats</div>
          </div>
        </div>
        <div class="form-group">
          <label for="departure">Departure Address</label><br>
          <select formControlName="departure" [ngClass]="{ 'is-invalid': submitted && controls.departure.errors }">
            <option value="">Choose your departure address</option>
            <option *ngFor="let opt of this.departureOptions" [value]="opt">{{opt}}</option>
          </select>
          <div *ngIf="submitted && controls.departure.errors" class="invalid-feedback">
              <div *ngIf="controls.departure.errors?.required">Please select a departure address</div>
          </div>
        </div>
        <label> Enter a Destination Address</label>
        <div class="form-group">
          <label for="street">Street</label><br>
          <input type="text" formControlName="street" [ngClass]="{ 'is-invalid': submitted && controls.street.errors }"/>
          <div *ngIf="submitted && controls.street.errors" class="invalid-feedback">
              <div *ngIf="controls.street.errors?.required">Street field is required</div>
          </div>
        </div>
        <div class="form-group">
          <label for="city">City</label><br>
          <input type="text" formControlName="city" [ngClass]="{ 'is-invalid': submitted && controls.city.errors }"/>
          <div *ngIf="submitted && controls.city.errors" class="invalid-feedback">
              <div *ngIf="controls.city.errors?.required">City field is required</div>
          </div>
        </div>
        <div class="form-group">
          <label for="state">State</label><br>
          <select formControlName="state" [ngClass]="{ 'is-invalid': submitted && controls.state.errors }">
            <label for="state">State</label><br>
            <option *ngFor="let state of states" [value]="state">{{state}}</option>
          </select>
          <div *ngIf="submitted && controls.state.errors" class="invalid-feedback">
              <div *ngIf="controls.state.errors?.required">State field is required</div>
          </div>
        </div>
        <div class="form-group">
          <label for="zip">Zip Code</label><br>
          <input type="text" formControlName="zip" [ngClass]="{ 'is-invalid': submitted && controls.zip.errors }"/>
          <div *ngIf="submitted && controls.zip.errors" class="invalid-feedback">
              <div *ngIf="controls.zip.errors?.required">Zip Code field is required</div>
          </div>
        </div>
        <div class="form-group">
          <label for="date">Date</label><br>
          <div class="form-group">
            <div class="input-group">
              <input class="form-control" placeholder="yyyy-mm-dd"
                    name="date" formControlName="date" ngbDatepicker #d="ngbDatepicker">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary calendar" (click)="d.toggle()" type="button"></button>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="time">Time</label><br>
          <ngb-timepicker class="input-group" name="time" formControlName=time [meridian]="meridian"></ngb-timepicker>
          <button class="btn btn-sm btn-outline-{{meridian ? 'success' : 'danger'}}" (click)="toggleMeridian()">
          Meridian - {{meridian ? "ON" : "OFF"}}
          </button>
        </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
          <button type="button" class="btn btn-danger" (click)="submit()">Submit</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./trips.component.css']
})

export class CreateTripComponent {
  @Input() user: User;
  @Input() trip: Trip = new Trip();
  tripModalForm: FormGroup;
  numberArray: number[] = [];
  states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
            'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
            'WI','WY'];

  submitted = false;
  model: NgbDateStruct;
  time: string;
  meridian = true;
  depDate: string;
  depTime: string;
  // TODO: Validate address
  depAddress: string;
  departureOptions: string[] = [];

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private tripService: TripService,
  ) { }

  ngOnInit(): void {
    for (let i = 1; i <= this.trip.availableSeats; i++) {
      this.numberArray.push(i);
    }
    this.departureOptions.push("Home");
    this.departureOptions.push("Work");

    this.tripModalForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: [''],
      departure: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      availableSeats: ['', Validators.required],
      time: ['']
    });

    this.trip.destination = new Address("", "", "", "", "");
  }

  //Submit button for creating a new trip
  submit() {
    this.submitted = true;

    if(this.tripModalForm.invalid) {
      return;
    }


    this.depDate = this.tripModalForm.value.date.year + ' ' + this.tripModalForm.value.date.month + ' ' + this.tripModalForm.value.date.day;
    this.depTime = this.tripModalForm.value.time.hour + ':' + this.tripModalForm.value.time.minute;
    this.depAddress = this.tripModalForm.value.departure;

    
     // builds the trip object to be sent to the back end
    this.trip.tripId = 0;
    this.trip.name = this.tripModalForm.value.name;

    this.trip.destination.street = this.tripModalForm.value.street;
    this.trip.destination.city = this.tripModalForm.value.city;
    this.trip.destination.state = this.tripModalForm.value.state;
    this.trip.destination.zip = this.tripModalForm.value.zip;

    this.trip.availableSeats = this.tripModalForm.value.availableSeats;

    this.time = this.tripModalForm.value.time;

    this.trip.tripDate = new Date(this.depDate + ' ' + this.depTime)

    if (this.depAddress === "Home") {
      this.trip.departure = this.user.hAddress;
    } else {
      this.trip.departure = this.user.wAddress;
    }

    console.log(this.trip);
    this.tripService.addTrip(this.trip).subscribe(trip => {
      if (trip !== null) {
        this.activeModal.close();
      } else {
        console.log('Did not submit successfully');
      }
    });
  }

  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  get controls() {
    return this.tripModalForm.controls;
  }
}


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  isDriver: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user: User = new User();
  car: Car = new Car();
  //constructor(private tripserv: TripService) { }
  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private carService: CarService,
  ) {
    // TODO: Since we aren't implementing robust login, fetch userId from session storage
    this.user = this.userService.retrieveUser();
    console.log(this.user);
  }

  ngOnInit(): void {

    if (this.user.driver) {
      this.carService.getCarByUserId2(this.user.userId.toString()).subscribe((value: Car) => {
        this.car = value;
      });
    }
  }

  open(user: User) {
    const modalRef = this.modalService.open(CreateTripComponent);
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.trip.driver = user;
    // TODO: Dynamically get driver's car
    modalRef.componentInstance.trip.availableSeats = this.car.seats;
  };
}
