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
    fName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\\u00C0-\\u017F]+[- ]?[a-zA-Z\\u00C0-\\u017F]+$'), Validators.maxLength(30)]),
    lName: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\\u00C0-\\u017F]+[- ]?[a-zA-Z\\u00C0-\\u017F]+$'), Validators.maxLength(30)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12), Validators.pattern('^\\w+\\.?\\w+$')]),
    email: new FormControl('', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
    pNumber: new FormControl('', [Validators.pattern('^\\d{3}-\\d{3}-\\d{4}$'), Validators.required]),
    // apt/suite number
    streetAddress: new FormControl('',  Validators.pattern('[a-z A-Z0-9]*')),
    // The actual street address
    streetAddress2: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,6}[a-z A-Z0-9]*')]),
    city: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]*')]),
    state: new FormControl('AL', Validators.required),
    zip: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),
    driver: new FormControl('rider'),
  });
  
  ngOnInit() {
    // this.userService.getAllUsers().subscribe(
    //   res => {
    //     //console.log(res);
    //   }
      
    // );
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

  async submitUser() {
      // Pulls the information from the forms into our address object
      //USPS requires apt number to go ahead of street address so to comply we assigned the variables accordingly

      this.address.apt = this.signup.controls.streetAddress.value;
      this.address.street = this.signup.controls.streetAddress2.value;
      this.address.city = this.signup.controls.city.value;
      this.address.state = this.signup.controls.state.value;
      this.address.zip = this.signup.controls.zip.value;

      console.log(this.address);

      //Switch Statement to set the user to either a rider, driver, or both
      switch(this.signup.controls.driver.value){
        case "driver":{
          this.user.isDriver = true;
        }
        case "rider":{
          this.user.isAcceptingRides = true;
        }
        case "both":{
          this.user.isAcceptingRides = true;
          this.user.isDriver = true;
        }
      }

      //we need to instantite a container for error messages, assuming we are still collecting them
      //and showing them to the user. "test" should be an empty array
      let test;
      await this.validationService.validateAddress(this.address).then((result) => {
        test = result;
      })

      if (test) {
        //alert("An error occured with your address validation.\n Error message: " + test);
        return;
      } else {
        this.modalRef.hide();
        //@TODO
        //ADD USER, THEN:
        //AUTOMATICALLY LOG IN,
        //OR
        //ALERT USER THAT SIGN UP WAS SUCCESSFUL
        //OR BOTH
        return;
      }
    }

}
