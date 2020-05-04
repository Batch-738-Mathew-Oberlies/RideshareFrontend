import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { Batch } from 'src/app/models/batch';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { ValidationService } from 'src/app/services/validation-service/validation.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Address } from 'src/app/models/address';

@Component({
  selector: 'signupmodal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})

export class SignupModalComponent implements OnInit {

  address = new Address("", "", "", "", "");
  isDriver: boolean;
  isRider: boolean;
  user: User = new User();
  batch: Batch = new Batch();
  batches: Batch[];

  httpSuccess: boolean;
  httpError: boolean;

  //Store the retrieved template from the 'openModal' method for future use cases.
  modalRef :BsModalRef;
  states = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS',
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
    batch: new FormControl('', Validators.required),
    // apt/suite number
    streetAddress: new FormControl('',  Validators.pattern('[a-z A-Z0-9]*')),
    // The actual street address
    streetAddress2: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,6}[a-z A-Z0-9]*')]),
    city: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]*')]),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),
    driver: new FormControl('', [Validators.required])
  });
  
  ngOnInit() {
    
    this.batchService.getAllBatchesByLocation1().subscribe(
        res => {
          this.batches = res;
          console.log(this.batches);
            },
        );  
  }

  openModal(template: TemplateRef<any>){
    this.httpSuccess = false;
    this.httpError = false;
    this.signup.reset();
    this.signup.controls.state.reset('')
    this.signup.controls.batch.reset('')
    this.signup.controls.driver.reset('')
    this.modalRef = this.modalService.show(template);
  }

  async submitUser() {

    //Pulls the information from forms into the user object
    this.user.userName = this.signup.controls.username.value;
    this.user.firstName = this.signup.controls.fName.value;
    this.user.lastName = this.signup.controls.lName.value;
    this.user.email = this.signup.controls.email.value;
    this.user.phoneNumber = this.signup.controls.pNumber.value;
    this.user.batch.batchNumber = this.signup.controls.batch.value.split(' ')[0];
    this.user.batch.batchLocation = this.signup.controls.batch.value.split(' ')[1];
    this.user.workAddress = new Address(null, null, null, null, null);

    // Pulls the information from the forms into our address object
    //USPS requires apt number to go ahead of street address so to comply we assigned the variables accordingly
    this.address.apt = this.signup.controls.streetAddress.value;
    this.address.street = this.signup.controls.streetAddress2.value;
    this.address.city = this.signup.controls.city.value;
    this.address.state = this.signup.controls.state.value;
    this.address.zip = this.signup.controls.zip.value;
    

      //Switch Statement to set the user to either a rider, driver, or both
      switch(this.signup.controls.driver.value){
        case "driver":{
          this.user.driver = true;
          this.user.acceptingRides = false;
          break;
        }
        case "rider":{
          this.user.acceptingRides = true;
          this.user.driver = false;
          break;
        }
        case "both":{
          this.user.acceptingRides = true;
          this.user.driver = true;
          break;
        }
      }
      
    

    //Sets the final confirmed address and then attaches it to user model to be sent.
    let finalAddress: Address;
    await this.validationService.validateAddress(this.address).then((result) => {
      finalAddress = result;
    })

    if (finalAddress == null) {
      return;
    } else {
      this.user.homeAddress = finalAddress;
      console.log("user we're sending: ", this.user);
      this.userService.addUser(this.user).subscribe(
        () => {
          this.httpSuccess = true;
      },
        (error) => {
          this.httpError = true;
          console.log(error);
      });
      return;
    }
  }
}
