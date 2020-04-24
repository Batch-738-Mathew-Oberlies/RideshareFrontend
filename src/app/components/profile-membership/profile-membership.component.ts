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

  membershipInfoForm: FormGroup;

  // status = new FormControl('', Validators.required);
  // role = new FormControl('', Validators.required);

  isDriver: string;
  active: string;

  errorExists: boolean;
  errorMessage: string;
  success: string;

  /**
   * Sets this component's currentUser field to match the currently logged in user.
   */
  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    // this.membershipInfoForm = this.formBuilder.group ({
    //   status: this.status,
    //   role: this.role,
    // })
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileObject = response;
      console.log(this.profileObject);
    });
   }

  ngOnInit() {
  }

  /**
   * Updates the membership parameters of the currentUser field to match those given by
   * this component, and persists those changes to the database.
   */
  updatesMembershipInfo(){
    console.log(this.isDriver, this.active);

    // @ts-ignore
    this.profileObject.driver = (this.isDriver == "true");
    this.profileObject.active = (this.active == "true");

    console.log(this.profileObject);

    this.userService.updateUserInfo(this.profileObject).subscribe(
      (input) => { this.success = 'Updated Successfully!'; },
      (errorObj) => {
        this.errorExists = true;
        console.log(errorObj);
      }
    );
  }
}
