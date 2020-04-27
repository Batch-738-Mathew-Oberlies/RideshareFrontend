import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { Address } from 'src/app/models/address';
import { ValidationService } from 'src/app/services/validation-service/validation.service';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
            'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
            'WI','WY'];

  zipcode: string;
  city:string;
  address:string;
  address2:string;
  hState: string;
  currentUser: User;
  success :string;

  updatedAddress: Address;
  transientAddress: Address;
  constructor(private userService: UserService, private validationService: ValidationService) { }

  ngOnInit() {
   this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response: User)=>{
      this.currentUser = response;
      this.zipcode = response.hAddress.zip;
      this.city = response.hAddress.city;
      this.address = response.hAddress.apt;
      this.address2 = response.hAddress.street;
      this.hState = response.hAddress.state;

    });
  }

  addressChange = new FormGroup({
    address1: new FormControl(`${this.currentUser.hAddress.apt}`, Validators.pattern('[a-z A-Z0-9]*')),
    address2: new FormControl(`${this.currentUser.hAddress.street}`, [Validators.required, Validators.pattern('[0-9]{1,6}[a-z A-Z0-9]*')]),
    city: new FormControl(`${this.currentUser.hAddress.city}`, [Validators.required, Validators.pattern('[a-z A-Z]*')]),
    state: new FormControl(`${this.currentUser.hAddress.state}`, Validators.required),
    zip: new FormControl(`${this.currentUser.hAddress.zip}`, [Validators.required, Validators.pattern('[0-9]{5}')]),
  })

  async updatesContactInfo(){

    console.log(this.addressChange.value);

    this.updatedAddress = this.addressChange.value;

    await this.validationService.validateAddress(this.updatedAddress).then( data => {
      this.transientAddress = data;
    })

    if(this.transientAddress == null){
      return;
    }else {
      this.currentUser.hAddress = this.transientAddress;
      console.log(this.currentUser);
      this.userService.updateUserInfo(this.currentUser);
    }
  }
}
