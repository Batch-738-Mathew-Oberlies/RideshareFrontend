import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Trip } from 'src/app/models/trip';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {

  currentCar: Car;
  currentTrip: Trip;
  success :boolean;
  errorExists: boolean;
  errorArray: any;
  statusExists: boolean;
  statusMessage: string;

  carForm: FormGroup;
  make = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 -]+')]);
  model = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 -]+')]);
  nrSeats = new FormControl('', [Validators.required, Validators.min(1), Validators.max(6)]);
  availableSeats = new FormControl('', [Validators.required, Validators.min(0), (control: AbstractControl) => Validators.max(this.nrSeats.value)(control)]);

  constructor(private carService: CarService, private formBuilder: FormBuilder) {

    this.carService.getCarTripByUserId(sessionStorage.getItem("userid")).subscribe(
      (response) => {
        console.log(response);
        // @ts-ignore
        this.currentCar = response.car;
        // @ts-ignore
        this.currentTrip = response.currentTrip;

        this.make.setValue(this.currentCar.make);
        this.model.setValue(this.currentCar.model);
        this.nrSeats.setValue(this.currentCar.seats);
        this.availableSeats.setValue(this.currentTrip.availableSeats);
      }
    );

    this.carForm = this.formBuilder.group({
      make: this.make,
      model: this.model,
      nrSeats: this.nrSeats,
      availableSeats: this.availableSeats,
      currentCar: this.currentCar,
    })
  }

  ngOnInit() {}

  /**
   * Alters the fields of the car intialized in ngOnInit() to match those given by this component.
   */
  updatesCarInfo(){
    this.errorArray = [];
    this.currentCar.make = this.carForm.value.make;
    this.currentCar.model= this.carForm.value.model;
    this.currentCar.seats = this.carForm.value.nrSeats;
    this.currentTrip.availableSeats = this.carForm.value.availableSeats;

    this.carService.updateCarTrip(this.currentCar, this.currentTrip).subscribe(
      (response) => {
        console.log(response);
        this.success = true;
        this.statusMessage = "Updated Successfully!";
      },
      (errorObj) => {
        this.errorExists = true;
        this.errorArray = errorObj.error.errors;
      }
    )
  }
}