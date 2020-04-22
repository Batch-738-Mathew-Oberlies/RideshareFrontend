import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile-location',
  templateUrl: './profile-location.component.html',
  styleUrls: ['./profile-location.component.css']
})
export class ProfileLocationComponent implements OnInit {

  zipcode: number;
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
      this.zipcode = +response.haddress.zip;
      this.city = response.haddress.city;
      this.address = response.haddress.street;
      this.address2 = response.waddress.street;
      this.hState = response.haddress.state;

    });
  }

  updatesContactInfo(){
    this.currentUser.haddress.zip = this.zipcode.toString();
    this.currentUser.haddress.city = this.city;
    this.currentUser.haddress.street = this.address;
    this.currentUser.waddress.street = this.address2;
    this.currentUser.haddress.state = this.hState;
    //console.log(this.currentUser);
    this.userService.updateUserInfo(this.currentUser);
    this.success = "Updated Successfully!";
  }
}
