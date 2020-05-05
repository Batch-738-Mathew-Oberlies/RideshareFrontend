import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
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
  driver: boolean;
  active: boolean;
  success: string;
  constructor(private userService: UserService) { }
  /**
   * Sets this component's currentUser field to match the currently logged in user.
   */
  ngOnInit() {
    this.currentUser = this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response)=>{
      this.profileObject = response;
    });
  }

  /**
   * Updates the membership parameters of the currentUser field to match those given by
   * this component, and persists those changes to the database.
   */
  updatesMembershipInfo(){
    this.profileObject.driver = this.driver;
    this.profileObject.active = this.active;
    this.userService.updateUserInfo(this.profileObject);
    this.success = "Updated Successfully!";
  }
}
