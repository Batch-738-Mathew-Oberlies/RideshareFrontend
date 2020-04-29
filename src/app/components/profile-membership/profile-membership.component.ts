import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.css']
})

/**
 * The profile membership component.
 */
export class ProfileMembershipComponent implements OnInit {
  profileObject = new User();
  currentUser: any = '';

  isDriver: boolean;
  isActive: boolean;
  isAcceptingRides: boolean;

  // errorExists: boolean;
  // errorMessage: string;
  // success: string;
  button: boolean;
  statusExists: boolean;
  statusMessage: string;
  success :boolean;
  errorExists: boolean;

  /**
   * Sets this component's currentUser, isDriver, and isActive fields to match the currently logged in user.
   */
  constructor(private userService: UserService) {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe(
      (response) => {
        this.profileObject = response;
        console.log(this.profileObject);

        // @ts-ignore
        this.isDriver = this.profileObject.driver;
        this.isActive = this.profileObject.active;
        // @ts-ignore
        this.isAcceptingRides = this.profileObject.acceptingRides;
      }
    );

    this.disableButton();
   }

  ngOnInit() {
  }

  /**
   * Updates the membership parameters of the currentUser field to match those given by
   * this component, and persists those changes to the database.
   */
  updatesMembershipInfo(){

    // @ts-ignore
    this.profileObject.driver = this.isDriver;
    this.profileObject.active = this.isActive;
    // @ts-ignore
    this.profileObject.acceptingRides = this.isAcceptingRides;

    this.userService.updateUserInfo(this.profileObject).subscribe(
      () => { 
        this.success = true;
        this.statusMessage = "Updated Successfully!"
      },
      (errorObj) => {
        this.errorExists = true;
        this.statusMessage = errorObj.error.message;
      }
    );
  }


  /**
   * Disables submit button if the form fields have not been changed from their original value.
   */
  disableButton(){
    console.log(this.isDriver);
    // @ts-ignore
    if(this.isDriver != this.profileObject.driver || this.isActive != this.profileObject.active || this.isAcceptingRides != this.profileObject.acceptingRides ){
      this.button = false;
    } else {
      this.button = true;
    }
  }

  /**
   * Changes the isAcceptingRides boolean to match clicked button.
   */
  changeIsAcceptingRides(bool: boolean) {
    console.log("Before: " + this.isAcceptingRides);
    this.isAcceptingRides = bool;
    console.log("After: " + this.isAcceptingRides);
  }
}