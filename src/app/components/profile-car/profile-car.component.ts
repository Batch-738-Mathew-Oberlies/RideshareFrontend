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


  make: string;
  model:string;
  nrSeats:number;
  currentCar: Car;
  availableSeats:number;
  success :string;

  carForm: FormGroup;
  formMake = new FormControl('', Validators.required);
  formModel = new FormControl('', Validators.required);
  formNrSeats = new FormControl('', Validators.required);
  formCurrentCar = new FormControl('', Validators.required);
  formAvailableSeats = new FormControl('', Validators.required);
  

  constructor(private carService: CarService, private formBuilder: FormBuilder) { 
    this.carForm = this.formBuilder.group({
      make: this.formMake,
      model: this.formModel,
      nrSeats: this.formNrSeats,
      currentCar: this.formCurrentCar,
      availableSeats: this.formAvailableSeats
    })
  }

  ngOnInit() {

    this.carService.getCarByUserId2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.currentCar = response;
      this.make = response.make;
      this.model = response.model;
      this.nrSeats = response.seats;
      this.availableSeats = response.availableSeats;

    });


  }

  updatesCarInfo(){
    this.currentCar.make = this.carForm.value.make;
    this.currentCar.model= this.carForm.value.model;
    this.currentCar.seats = this.carForm.value.nrSeats;
    this.currentCar.availableSeats = this.carForm.value.availableSeats;
    //console.log(this.currentUser);
    this.carService.updateCarInfo(this.currentCar);
    this.success = "Updated Successfully!";
  }


}
