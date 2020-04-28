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

  errorExists: boolean;
  errorMessage: string;
  success: string;

  /**
   * Sets this component's currentUser, isDriver, and isActive fields to match the currently logged in user.
   */
  constructor(private userService: UserService) {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe(
      (response) => {

        // @ts-ignore
        this.isDriver = this.profileObject.driver;
        this.isActive = this.profileObject.active;
      }
    );
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

    this.userService.updateUserInfo(this.profileObject).subscribe(
      () => { 
        this.success = 'Updated Successfully!'; 
      },
      (errorObj) => {
        this.errorExists = true;
        console.log(errorObj);
      }
    );
  }
}
