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


  // make: string;
  // model:string;
  // nrSeats:number;
  currentCar: Car;
  // availableSeats:number;
  success :boolean;
  errorExists: boolean;
  // errorMessage: string;
  statusExists: boolean;
  statusMessage: string;

  carForm: FormGroup;
  make = new FormControl('', Validators.required);
  model = new FormControl('', Validators.required);
  nrSeats = new FormControl('', [Validators.required, Validators.min(1), Validators.max(6)]);
  // availableSeats = new FormControl('', [Validators.required, Validators.min(0)]);

  constructor(private carService: CarService, private formBuilder: FormBuilder) {
    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentCar = response;
      console.log(this.currentCar);
      this.make.setValue(this.currentCar.make);
      this.model.setValue(this.currentCar.model);
      this.nrSeats.setValue(this.currentCar.seats);
      //this.availableSeats.setValue(0);
    });
    this.carForm = this.formBuilder.group({
      make: this.make,
      model: this.model,
      nrSeats: this.nrSeats,
      currentCar: this.currentCar,
      // availableSeats: this.availableSeats
    })
  }

  /**
   * Calls in and initializes the car posessed by the currently logged in user.
   */
  ngOnInit() {

    // this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
    //   this.currentCar = response;
    //   console.log(this.currentCar);
    //   this.make.setValue(this.currentCar.make);
    //   this.model.setValue(this.currentCar.model);
    //   this.nrSeats.setValue(this.currentCar.seats);
    //   // this.availableSeats.setValue(0);
    // });


  }

  /**
   * Alters the fields of the car intialized in ngOnInit() to match those given by this component.
   */
  updatesCarInfo(){
    this.currentCar.make = this.carForm.value.make;
    this.currentCar.model= this.carForm.value.model;
    this.currentCar.seats = this.carForm.value.nrSeats;
    // this.currentCar.availableSeats = this.carForm.value.availableSeats;
    //console.log(this.currentUser);
    this.carService.updateCarInfo2(this.currentCar).subscribe(
      () => {
        this.success = true;
        this.statusMessage = "Updated Successfully!";
      },
      (errorObj) => {
        this.errorExists = true;
        this.statusMessage = errorObj.error.message;
      }
    )
    
  }


}
