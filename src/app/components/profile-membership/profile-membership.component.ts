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
  currentUser: any;

  isDriver: boolean;
  isActive: boolean;
  isAcceptingRides: boolean;

  button: boolean;
  statusExists: boolean;
  statusMessage: string;
  success :boolean;
  errorExists: boolean;

  /**
   * Sets this component's currentUser, isDriver, and isActive fields to match the currently logged in user.
   */
  constructor(private userService: UserService) {
    this.disableButton();
   }

  ngOnInit() {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe(
      (response) => {
        this.profileObject = response;
        console.log(this.profileObject);

        
        this.isDriver = this.profileObject.driver;
        this.isActive = this.profileObject.active;
        this.isAcceptingRides = this.profileObject.acceptingRides;
      }
    );
    this.button = true;
  }

  /**
   * Updates the membership parameters of the currentUser field to match those given by
   * this component, and persists those changes to the database.
   */
  updatesMembershipInfo(){
    if(this.getBoolean(this.isDriver) == false){
      this.isAcceptingRides = false;
    }
    
    this.profileObject.driver = this.isDriver;
    this.profileObject.active = this.isActive;
    
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
   * Converts values into their boolean value.
   * Used to mitigate issues arising from the type change due to the "select"
   * components in the form.
   */
  getBoolean(value) : boolean{
    switch(value){
         case true:
         case "true":
             return true;
         default: 
             return false;
     }
 }

  /**
   * Disables submit button if the form fields have not been changed from their original value.
   */
  disableButton(){
    
    if(this.getBoolean(this.isDriver) != this.profileObject.driver || this.getBoolean(this.isActive) != this.profileObject.active || this.getBoolean(this.isAcceptingRides) != this.profileObject.acceptingRides ){
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