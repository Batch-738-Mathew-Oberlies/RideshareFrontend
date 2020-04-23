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
          <label>Address</label><br>
          <input type="text"/>
        </div>
        <div class="form-group">
          <label for="trip.time">Departure Time</label><br>
          <input type="time" formControlName="time"/>
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


  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) { 
    this.tripModalForm = this.formBuilder.group({
      name: [''],
      time: ['']
    });
  }

  submit() {
    this.trip = this.tripModalForm.value;
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
