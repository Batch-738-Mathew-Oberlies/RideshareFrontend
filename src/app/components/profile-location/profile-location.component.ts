import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  zipcode: string;
  city:string;
  address:string;
  address2:string;
  hState: string;
  currentUser: User;
  success :string;

  constructor(private userService: UserService) { }

  ngOnInit() {
   this.userService.getUserById2(sessionStorage.getItem("userid")).subscribe((response: User)=>{
      this.currentUser = response;
      this.zipcode = response.hAddress.zip;
      this.city = response.hAddress.city;
      this.address = response.hAddress.street2;
      this.address2 = response.hAddress.street1;
      this.hState = response.hAddress.state;

    });
  }


  updatesContactInfo(){

    this.currentUser.hAddress.zip = this.zipcode;
    this.currentUser.hAddress.city = this.city;
    this.currentUser.hAddress.street2 = this.address;
    this.currentUser.hAddress.street1 = this.address2;
    this.currentUser.hAddress.state = this.hState;

    //console.log(this.currentUser);
    this.userService.updateUserInfo(this.currentUser);
    this.success = "Updated Successfully!";
  }
}
