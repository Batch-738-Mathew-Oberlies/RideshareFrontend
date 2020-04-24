import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-profile-membership',
  templateUrl: './profile-membership.component.html',
  styleUrls: ['./profile-membership.component.css']
})
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
