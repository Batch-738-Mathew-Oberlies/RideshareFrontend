import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'src/app/models/trip';
import { Car } from 'src/app/models/car';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';
//import { TripService } from 'src/app/services/trip.service'

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
          <input type="text" formControlName="name" [ngClass]="{ 'is-invalid': submitted && controls.name.errors }"/>
          <div *ngIf="submitted && controls.name.errors" class="invalid-feedback">
              <div *ngIf="this.tripModalForm.controls.name.errors?.required">Name is required</div>
          </div>
          
        </div>
        <div class="form-group">
          <label for="availableSeats">Available Seats</label><br>
          <select formControlName="availableSeats" [ngClass]="{ 'is-invalid': submitted && controls.availableSeats.errors }">
            <option value="">Choose number of available seats</option>
            <option *ngFor="let num of this.numberArray" [value]="num">{{num}}</option>
          </select>
          <div *ngIf="submitted && controls.availableSeats.errors" class="invalid-feedback">
              <div *ngIf="controls.name.errors?.required">Please select a number of available seats</div>
          </div>
        </div>
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
          <label for="date">Departure Time</label><br>
          <input type="datetime-local" formControlName="date" [ngClass]="{ 'is-invalid': submitted && controls.date.errors }"/>
          <div *ngIf="submitted && controls.date.errors" class="invalid-feedback">
              <div *ngIf="controls.date.errors?.required">Departure Time field is required</div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
          <button type="button" class="btn btn-danger" (click)="submit()">Submit</button>
        </div>
      </form>
    </div>
   
  `
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


  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    for (let i = 1; i <= this.trip.availableSeats; i++) {
      this.numberArray.push(i);
      // console.log(this.numberArray);
    }
    this.tripModalForm = this.formBuilder.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      availableSeats: ['', Validators.required]
    });

    this.trip.destination = new Address();
  }

  submit() {
    this.submitted = true;

    if(this.tripModalForm.invalid) {
      return;
    }

    this.trip.name = this.tripModalForm.value.name;
    this.trip.date = this.tripModalForm.value.date;
    this.trip.destination.street = this.tripModalForm.value.street;
    this.trip.destination.city = this.tripModalForm.value.city;
    this.trip.destination.state = this.tripModalForm.value.state;
    this.trip.destination.zip = this.tripModalForm.value.zip;
    this.trip.availableSeats = this.tripModalForm.value.availableSeats;
    console.log(this.trip);
    this.activeModal.close();

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

  user: User;
  //constructor(private tripserv: TripService) { }
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.user = new User();
    this.user.isDriver=true;
  }

  open(user: User, car: Car) {
    const modalRef = this.modalService.open(CreateTripComponent);
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.trip.driver = user;
    modalRef.componentInstance.trip.availableSeats = 4;
  }

}
