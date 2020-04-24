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

  zipcode = new FormControl('', Validators.required);
  city = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  address2 = new FormControl('', Validators.required);
  hState = new FormControl('', Validators.required);

  errorExists: boolean;
  errorMessage: string;
  success: string;
  currentUser: User;

  /**
   * Sets the user location information of this component to match that of the currently
   * logged in user as it appears in the database.
   */
  constructor(private userService: UserService, private formBuilder: FormBuilder ) {
    this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response: User)=>{
      this.currentUser = response;
      this.zipcode.setValue(+response.haddress.zip);
      this.city.setValue(response.haddress.city);
      this.address.setValue(response.haddress.street);
      this.address2.setValue(response.waddress.street);
      this.hState.setValue(response.haddress.state);

    });

    this.locationInfoForm = this.formBuilder.group({
      zipcode:this.zipcode,
      city: this.city,
      haddress: this.address,
      waddress: this.address2,
      hState: this.hState
    });


   }

  ngOnInit() {

  }

  /**
   * Updates the location information of the current user to match that found in this component,
   * and persists those changes to the database.
   */
  updatesContactInfo(){
    this.currentUser.haddress.zip = this.zipcode.value;
    this.currentUser.haddress.city = this.city.value;
    this.currentUser.haddress.street = this.address.value;
    this.currentUser.waddress.street = this.address2.value;
    this.currentUser.haddress.state = this.hState.value;
    //console.log(this.currentUser);
    this.userService.updateUserInfo(this.currentUser).subscribe(
      (input) => { this.success = 'Updated Successfully!'; },
      (errorObj) => {
        this.errorExists = true;
        if (errorObj.error.message == 'Invalid Address') {
            this.errorMessage = '' + errorObj.error.haddress + ' doesn\'t exist.';
        }
      }
    );
  }
}
