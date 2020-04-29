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

  states = ['AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA','HI','ID','IL','IN','IA','KS',
            'KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY',
            'NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV',
            'WI','WY'];

  statusExists: boolean;
  statusMessage: string;
  currentUser: User = new User();
  success :boolean;
  errorExists: boolean;
  updatedAddress: Address;
  transientHomeAddress: Address;
  transientWorkAddress: Address;

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
  
  ngOnInit() {
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response: User)=>{
      this.currentUser = response;
      console.log(response);
      // this.currentUser.haddress.id = 0;
      // this.currentUser.waddress.id = 0;
      //@ts-ignore
      this.addressChange.controls.homeAddressApt.setValue(this.currentUser.haddress.apt == null ? '' : this.currentUser.haddress.apt);
      //@ts-ignore
      this.addressChange.controls.homeAddress.setValue(this.currentUser.haddress.street);
      //@ts-ignore
      this.addressChange.controls.homeCity.setValue(this.currentUser.haddress.city);
      //@ts-ignore
      this.addressChange.controls.homeState.setValue(this.currentUser.haddress.state);
      //@ts-ignore
      this.addressChange.controls.homeZip.setValue(this.currentUser.haddress.zip);

      //@ts-ignore
      this.addressChange.controls.workAddressApt.setValue(this.currentUser.waddress.apt == null ? '' : this.currentUser.waddress.apt );
      //@ts-ignore
      this.addressChange.controls.workAddress.setValue(this.currentUser.waddress.street);
      //@ts-ignore
      this.addressChange.controls.workCity.setValue(this.currentUser.waddress.city);
      //@ts-ignore
      this.addressChange.controls.workState.setValue(this.currentUser.waddress.state);
      //@ts-ignore
      this.addressChange.controls.workZip.setValue(this.currentUser.waddress.zip);
    });
  }

  /**
   * Sets the user location information of this component to match that of the currently
   * logged in user as it appears in the database.
   */
  // constructor(private userService: UserService, private validationService: ValidationService) {
  //  }

  // ngOnInit() {
  //   this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response: User)=>{
  //     console.log(response);
  //     this.currentUser = response;
  //     console.log(this.currentUser);
  //   });
  // }

  /**
   * Updates the location information of the current user to match that found in this component,
   * and persists those changes to the database.
   */
  async updatesContactInfo(){
    //@ts-ignore
    this.currentUser.haddress.street = this.addressChange.controls.homeAddress.value;
    //@ts-ignore
    this.currentUser.haddress.apt = this.addressChange.controls.homeAddressApt.value;
    //@ts-ignore
    this.currentUser.haddress.city = this.addressChange.controls.homeCity.value;
    //@ts-ignore
    this.currentUser.haddress.state = this.addressChange.controls.homeState.value;
    //@ts-ignore
    this.currentUser.haddress.zip = this.addressChange.controls.homeZip.value;
    //@ts-ignore
    this.currentUser.waddress.street = this.addressChange.controls.workAddress.value;
    //@ts-ignore
    this.currentUser.waddress.apt = this.addressChange.controls.workAddressApt.value;
    //@ts-ignore
    this.currentUser.waddress.city = this.addressChange.controls.workCity.value;
    //@ts-ignore
    this.currentUser.waddress.state = this.addressChange.controls.workState.value;
    //@ts-ignore
    this.currentUser.waddress.zip = this.addressChange.controls.workZip.value;

    //@ts-ignore
    await this.validationService.validateAddress(this.currentUser.haddress).then( data => {
      this.transientHomeAddress = data;
      //@ts-ignore
      this.transientHomeAddress.id = this.currentUser.haddress.id;
    })

    //@ts-ignore
    await this.validationService.validateAddress(this.currentUser.waddress).then( data => {
      this.transientWorkAddress = data;
      //@ts-ignore
      this.transientWorkAddress.id = this.currentUser.waddress.id;
    })

    if(this.transientWorkAddress == null || this.transientHomeAddress == null){
      return;
    }else {
      //@ts-ignore
      this.currentUser.haddress = this.transientHomeAddress;
      //@ts-ignore
      this.currentUser.waddress = this.transientWorkAddress;
      console.log(this.currentUser);
      this.userService.updateUserInfo(this.currentUser).subscribe(
        (input) => { 
          this.success = true;
          this.statusMessage = 'Updated Successfully!'; },
        (errorObj) => {
          this.errorExists= true;
          console.log(errorObj);
          if (errorObj.error.message == 'Invalid Address') {
              this.statusMessage = '' + errorObj.error.haddress + ' doesn\'t exist.';
          }
        }
      );
    }
  }
}