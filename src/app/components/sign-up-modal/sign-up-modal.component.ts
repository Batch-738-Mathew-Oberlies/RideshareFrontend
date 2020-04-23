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
    fName: new FormControl('', [Validators.required, Validators.pattern('[A-Z]{1}[a-z A-Z]*'), Validators.minLength(3)]),
    lName: new FormControl('', [Validators.required, Validators.pattern('[A-Z]{1}[a-z A-Z]*'), Validators.minLength(3)]),
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]),
    email: new FormControl('', Validators.email),
    pNumber: new FormControl('', Validators.pattern('[2-9]{1}[0-9]{9}')),
    streetAddress: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,6}[a-z A-Z0-9]*')]),
    streetAddress2: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z0-9]*')]),
    city: new FormControl('', [Validators.required, Validators.pattern('[A-Z]{1}[a-z A-Z]*')]),
    state: new FormControl('', Validators.required),
    zip: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),
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
      console.log(this.address);
    }

}
