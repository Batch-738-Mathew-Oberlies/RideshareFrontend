import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Trip } from 'src/app/models/trip';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-profile-car',
  templateUrl: './profile-car.component.html',
  styleUrls: ['./profile-car.component.css']
})
export class ProfileCarComponent implements OnInit {

  newCar: boolean;
  currentCar: Car;
  success :boolean;
  errorExists: boolean;
  errorArray: any;
  statusExists: boolean;
  statusMessage: string;

  carForm: FormGroup;
  make = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 -]+')]);
  model = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 -]+')]);
  year = new FormControl('', [Validators.pattern('[0-9]+'), Validators.min(0)]);
  color = new FormControl('', Validators.pattern('[a-zA-Z ]+'));
  nrSeats = new FormControl('', [Validators.required, Validators.min(1), Validators.max(6)]);

  constructor(private carService: CarService, private userService: UserService, private formBuilder: FormBuilder) {
    console.log(this.newCar);
    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe(
      (car) => {
        if (car != null){
          this.newCar = false;
          this.currentCar = car;
          this.make.setValue(this.currentCar.make);
          this.model.setValue(this.currentCar.model);
          this.year.setValue(this.currentCar.year);
          this.color.setValue(this.currentCar.color);
          this.nrSeats.setValue(this.currentCar.seats);
        } else {
          this.newCar = true;
          this.currentCar = new Car();
        }
      }
    );

    this.carForm = this.formBuilder.group({
      make: this.make,
      model: this.model,
      nrSeats: this.nrSeats,
      year: this.year,
      color: this.color,
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
    this.currentCar.year= this.carForm.value.year;
    this.currentCar.color= this.carForm.value.color;
    this.currentCar.seats = this.carForm.value.nrSeats;

    if (this.newCar == true){
      this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe(
        (user) => {
          this.currentCar.user = user;
          this.carService.createCar(this.currentCar).subscribe(
            () => {
              this.success = true;
              this.statusMessage = "Created Successfully!";
             },
            (errorObj) => {
              this.errorExists = true;
              this.errorArray = errorObj.error.errors;
            }
          )
        }
      )
    } else {
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
}