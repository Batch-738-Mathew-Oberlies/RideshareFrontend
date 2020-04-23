import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Trip } from 'src/app/models/trip';
import { Car } from 'src/app/models/car';
import { FormBuilder, FormGroup } from '@angular/forms';
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
          <label for="trip.name">Name</label><br>
          <input type="text" formControlName="name"/>
        </div>
        <div class="form-group">
          <label for="trip.availableSeats">Available Seats</label><br>
          <select formControlName="availableSeats">
            <option value="">Choose number of available seats</option>
            <option *ngFor="let num of this.numberArray" [value]="num">{{num}}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Address</label><br>
          <input type="text"/>
        </div>
        <div class="form-group">
          <label for="trip.time">Departure Time</label><br>
          <input type="datetime-local" formControlName="time"/>
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary" (click)="activeModal.dismiss('cancel click')">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="submit(); activeModal.close('Close click')">Submit</button>
    </div>
  `
})
export class CreateTripComponent {
  @Input() user: User;
  @Input() trip: Trip = new Trip();
  tripModalForm: FormGroup;
  numberArray: number[] = [];


  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { 
    console.log(this.trip);
    this.tripModalForm = this.formBuilder.group({
      name: [''],
      time: [''],
      availableSeats: ['']
    });

    for (let i = 1; i <= this.trip.availableSeats; i++) {
      this.numberArray.push(i);
      console.log(this.numberArray);
    }

    console.log(this.numberArray);
  }

  ngOnInit(): void {
    for (let i = 1; i <= this.trip.availableSeats; i++) {
      this.numberArray.push(i);
      console.log(this.numberArray);
    }
  }

  submit() {
    this.trip.name = this.tripModalForm.value.name;
    this.trip.time = this.tripModalForm.value.time;
    this.trip.availableSeats = this.tripModalForm.value.availableSeats;
    console.log(this.trip);

  }

}


@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  user: User;
  car: Car;
  //constructor(private tripserv: TripService) { }
  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    this.user = new User();
    this.car =  new Car();
    this.user.isDriver=true;
  }

  open(user: User, car: Car) {
    const modalRef = this.modalService.open(CreateTripComponent);
    modalRef.componentInstance.user = user;
    modalRef.componentInstance.trip.driver = user;
    modalRef.componentInstance.trip.availableSeats = 4;
    modalRef.componentInstance.trip.vehicle = car;
  }

}
