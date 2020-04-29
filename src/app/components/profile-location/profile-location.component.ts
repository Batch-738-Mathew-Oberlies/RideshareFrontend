import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {


  locationInfoForm: FormGroup;

  homeStreet = new FormControl('', Validators.required);
  homeCity = new FormControl('', Validators.required);
  homeState = new FormControl('', Validators.required);
  homeZipcode = new FormControl('', Validators.required);

  workStreet = new FormControl('', Validators.required);
  workCity = new FormControl('', Validators.required);
  workState = new FormControl('', Validators.required);
  workZipcode = new FormControl('', Validators.required);

  // zipcode = new FormControl('', Validators.required);
  // city = new FormControl('', Validators.required);
  // homeAddress = new FormControl('', Validators.required);
  // address2 = new FormControl('', Validators.required);
  // hState = new FormControl('', Validators.required);

  // errorExists: boolean;
  // errorMessage: string;
  // success: string;
  statusExists: boolean;
  statusMessage: string;
  currentUser: User;
  success :boolean;
  errorExists: boolean;

  /**
   * Sets the user location information of this component to match that of the currently
   * logged in user as it appears in the database.
   */
  constructor(private userService: UserService, private formBuilder: FormBuilder ) {
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response: User)=>{
      this.currentUser = response;
      this.homeStreet.setValue(response.haddress.street);
      this.homeCity.setValue(response.haddress.city);
      this.homeState.setValue(response.haddress.state);
      this.homeZipcode.setValue(response.haddress.zip);
      this.workStreet.setValue(response.waddress.street);
      this.workCity.setValue(response.waddress.city);
      this.workState.setValue(response.waddress.state);
      this.workZipcode.setValue(response.waddress.zip);

    });

    this.locationInfoForm = this.formBuilder.group({
      homeStreet: this.homeStreet,
      homeCity: this.homeCity,
      homeState: this.homeState,
      homeZipcode: this.homeZipcode,
      workStreet: this.workStreet,
      workCity: this.workCity,
      workState: this.workState,
      workZipcode: this.workZipcode,
    });


   }

  ngOnInit() {

  }

  /**
   * Updates the location information of the current user to match that found in this component,
   * and persists those changes to the database.
   */
  updatesContactInfo(){
    this.currentUser.haddress.street = this.homeStreet.value;
    this.currentUser.haddress.city = this.homeCity.value;
    this.currentUser.haddress.state = this.homeState.value;
    this.currentUser.haddress.zip = this.homeZipcode.value;
    this.currentUser.waddress.street = this.workStreet.value;
    this.currentUser.waddress.city = this.workCity.value;
    this.currentUser.waddress.state = this.workState.value;
    this.currentUser.waddress.zip = this.workZipcode.value;

    //console.log(this.currentUser);
    this.userService.updateUserInfo(this.currentUser).subscribe(
      (input) => { 
        this.success = true;
        this.statusMessage = 'Updated Successfully!'; },
      (errorObj) => {
        this.errorExists= true;
        if (errorObj.error.message == 'Invalid Address') {
            this.statusMessage = '' + errorObj.error.haddress + ' doesn\'t exist.';
        }
      }
    );
  }
}
