import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {

  currentCar: Car;
  success :boolean;
  errorExists: boolean;
  errorArray: any;
  statusExists: boolean;
  statusMessage: string;

  carForm: FormGroup;
  make = new FormControl('', Validators.required);
  model = new FormControl('', Validators.required);
  nrSeats = new FormControl('', [Validators.required, Validators.min(1), Validators.max(6)]);

  constructor(private carService: CarService, private formBuilder: FormBuilder) {
    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentCar = response;
      console.log(this.currentCar);
      this.make.setValue(this.currentCar.make);
      this.model.setValue(this.currentCar.model);
      this.nrSeats.setValue(this.currentCar.seats);
    });
    this.carForm = this.formBuilder.group({
      make: this.make,
      model: this.model,
      nrSeats: this.nrSeats,
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

    this.carService.updateCarInfo2(this.currentCar).subscribe(
      () => {
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