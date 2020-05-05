import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Address } from 'src/app/models/address';
import { ValidationService } from 'src/app/services/validation-service/validation.service';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  currentUser;
  
  states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
            'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
            'WI','WY'];
  
  updatedAddress: Address;
  transientHomeAddress: Address;
  transientWorkAddress: Address;
  
  statusExists: boolean;
  statusMessage: string;
  success :boolean;
  errorExists: boolean;
  errorArray: any;
  
  addressChange = new FormGroup({
    homeAddressApt: new FormControl('', Validators.pattern('[a-z A-Z0-9]*')),
    homeAddress: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,6}[a-z A-Z0-9]*')]),
    homeCity: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]*')]),
    homeState: new FormControl('', Validators.required),
    homeZip: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),

    workAddressApt: new FormControl('', Validators.pattern('[a-z A-Z0-9]*')),
    workAddress: new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,6}[a-z A-Z0-9]*')]),
    workCity: new FormControl('', [Validators.required, Validators.pattern('[a-z A-Z]*')]),
    workState: new FormControl('', Validators.required),
    workZip: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),
  })

  constructor(private userService: UserService, private validationService: ValidationService) {}
  
  /**
   * Sets the user location information of this component to match that of the currently
   * logged in user as it appears in the database.
   */
  ngOnInit() {
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe(
      (response)=>{
        this.currentUser = response;

        this.addressChange.controls.homeAddressApt.setValue(this.currentUser.homeAddress.apt == null ? '' : this.currentUser.homeAddress.apt);
        this.addressChange.controls.homeAddress.setValue(this.currentUser.homeAddress.street);
        this.addressChange.controls.homeCity.setValue(this.currentUser.homeAddress.city);
        this.addressChange.controls.homeState.setValue(this.currentUser.homeAddress.state);
        this.addressChange.controls.homeZip.setValue(this.currentUser.homeAddress.zip);

        this.addressChange.controls.workAddressApt.setValue(this.currentUser.workAddress.apt == null ? '' : this.currentUser.workAddress.apt );
        this.addressChange.controls.workAddress.setValue(this.currentUser.workAddress.street);
        this.addressChange.controls.workCity.setValue(this.currentUser.workAddress.city);
        this.addressChange.controls.workState.setValue(this.currentUser.workAddress.state);
        this.addressChange.controls.workZip.setValue(this.currentUser.workAddress.zip);
      }
    );
  }

  /**
   * Updates the location information of the current user to match that found in this component,
   * and persists those changes to the database.
   */
  async updatesContactInfo(){
    this.errorArray = [];
    
    this.currentUser.homeAddress.street = this.addressChange.controls.homeAddress.value;
    this.currentUser.homeAddress.apt = this.addressChange.controls.homeAddressApt.value;
    this.currentUser.homeAddress.city = this.addressChange.controls.homeCity.value;
    this.currentUser.homeAddress.state = this.addressChange.controls.homeState.value;
    this.currentUser.homeAddress.zip = this.addressChange.controls.homeZip.value;
    
    this.currentUser.workAddress.street = this.addressChange.controls.workAddress.value;
    this.currentUser.workAddress.apt = this.addressChange.controls.workAddressApt.value;
    this.currentUser.workAddress.city = this.addressChange.controls.workCity.value;
    this.currentUser.workAddress.state = this.addressChange.controls.workState.value;
    this.currentUser.workAddress.zip = this.addressChange.controls.workZip.value;

    
    await this.validationService.validateAddress(this.currentUser.homeAddress).then( data => {
      this.transientHomeAddress = data;
      if(this.transientHomeAddress == null){
        return;
      }else {
        this.transientHomeAddress = this.currentUser.homeAddress;
      }
    })
    
    await this.validationService.validateAddress(this.currentUser.workAddress).then( data => {
      this.transientWorkAddress = data;
      if(this.transientWorkAddress == null){
        return;
      }else {
        this.transientWorkAddress = this.currentUser.workAddress;
      }
    })
    
    /**
     * Determines if the inputed work and home addresses are valid.
     * Triggers the relevant alert depending on if the addresses were updated successfully.
     */
    if(this.transientWorkAddress == null || this.transientHomeAddress == null){
      return;
    }else {
      this.currentUser.homeAddress = this.transientHomeAddress;
      this.currentUser.workAddress = this.transientWorkAddress;

      this.userService.updateUserInfo(this.currentUser).subscribe(
        (input) => { 
          this.success = true;
          this.statusMessage = 'Updated Successfully!'; },
        (errorObj) => {
          this.errorExists= true;
          this.errorArray = errorObj.error.errors;
        }
      );
    }
  }
}