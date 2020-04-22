import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { FormControl, FormGroup, Validator, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignupModalComponent implements OnInit {
  fname :string;
  lname :string;
  username :string;
  email :string;
  phone :string;
  address = new Address();
  isDriver: boolean;
  isRider: boolean;

  user :User = new User();
  batch: Batch = new Batch();
  batches: Batch[];
  // validation
  firstNameError :string;
  lastNameError :string;
  emailError :string;
  phoneNumberError :string;
  userNameError :string;
  hAddressError :string;
  hStateError :string;
  hCityError :string;
  hZipError :string;
  
  success :string;
  //Store the retrieved template from the 'openModal' method for future use cases.
  modalRef :BsModalRef;
  states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
            'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
            'WI','WY'];
  constructor(private modalService :BsModalService, private userService :UserService, private batchService :BatchService, private validationService :ValidationService) { }

  signup = new FormGroup({
    fName: new FormControl(''),
    lName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    pNumber: new FormControl(''),
    streetAddress: new FormControl('', Validators.required),
    streetAddress2: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    zip: new FormControl(''),
    rider: new FormControl(false),
    driver: new FormControl(false),
  });
  
  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      res => {
        //console.log(res);
      }
    );

  this.batchService.getAllBatchesByLocation1().subscribe(
      res => {
         this.batches = res;
          },
      );
  }
  //Opens 'sign up' modal that takes in a template of type 'ng-template'.

  openModal(template :TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  submitUser() {
<<<<<<< HEAD
    this.user.userId = 0;
    this.firstNameError = '';
    this.lastNameError = '';
    this.phoneNumberError ='';
    this.userNameError ='';
    this.emailError ='';
    this.hStateError='';
    this.hAddressError='';
    this.hCityError='';
    this.hZipError='';
    this.success='';
<<<<<<< HEAD
    this.user.waddress = this.user.haddress;
    this.user.waddress.state = this.user.haddress.state;
    this.user.waddress.city = this.user.haddress.city;
    this.user.waddress.zip = this.user.haddress.zip;
=======
    this.user.wAddress = this.user.hAddress;
>>>>>>> Added address model and realigned code and models to reflect this change
    let driver = <HTMLInputElement> document.getElementById("driver");  
    let rider = <HTMLInputElement> document.getElementById("rider");  

    if(driver.checked == true){
      this.user.isDriver =  true;
    }
    if(rider.checked == true){
      this.user.isDriver =  false;
    }
    //console.log(this.user);
    this.userService.addUser(this.user).subscribe(
      res => {
        console.log(res);
        let i = 0;
        if(res.firstName != undefined){
          this.firstNameError = res.firstName[0];
          i = 1;
        }
        if(res.lastName != undefined){
          this.lastNameError = res.lastName[0];
          i = 1;
          
        }
        if(res.phoneNumber != undefined){
          this.phoneNumberError = res.phoneNumber[0];
          i = 1;

        }
        if(res.email != undefined){
          this.emailError = res.email[0];
          i = 1;
=======
      this.address.street1 = this.signup.controls.streetAddress.value;
      this.address.street2 = this.signup.controls.streetAddress2.value;
      this.address.city = this.signup.controls.city.value;
      this.address.state = this.signup.controls.state.value;
      this.address.zip = this.signup.controls.zip.value;
>>>>>>> Changed sign up form removed radial buttons and implemnted form

      console.log(this.address);

<<<<<<< HEAD
        }
<<<<<<< HEAD
        if(res.haddress.state != undefined){
          this.hStateError = res.haddress.state[0];
          i = 1;

        }
        if(res.haddress != undefined){
          this.hAddressError = res.haddress[0];
          i = 1;

        }
        if(res.haddress.city != undefined){
          this.hCityError = res.haddress.city[0];
          i = 1;

        }
        if(res.haddress.zip != undefined){
          this.hZipError = res.haddress.zip[0];
          i = 1;

        }
=======
        if(res.hAddress != undefined){
          this.hAddressError = res.hAddress[0];
          i = 1;

        }
>>>>>>> Added address model and realigned code and models to reflect this change
        if(i === 0) {
          i = 0;
          this.success = "Registered successfully!";
        }
      } 
      /*res => {
        console.log("failed to add user");
        console.log(res);
      }*/
    );
  
    }
=======
>>>>>>> Changed sign up form removed radial buttons and implemnted form
    }

}
