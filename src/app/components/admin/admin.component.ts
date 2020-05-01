import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

/**
 * The Admin component
 */

export class AdminComponent implements OnInit {
  /**
   * This is the constructor
   * @param router Provides an instance of a router 
   * @param adminservice Provides an instance of an admin.
   */

  constructor(public router: Router, private adminservice: UserService, private authService: AuthService) { }


   users: User[];
   listofUsers: User[];

   truthy: string = 'btn btn-success';
   falsy: string = 'btn btn-danger';
   searchText;
  ngOnInit() {
    let adminId = this.authService.admin.adminId;

    if(adminId){
        this.adminservice.showAllUser()
        .subscribe(
          data=> {
            this.users = data;
            this.listofUsers = data;
          }
        )
      }
      else{
        this.router.navigate(['/']);
      }
  }

  /**
   * Searches the list of users in a non-case-sensitive fashion, based on whether the username
   * includes the searchText.
   */
  searchUser(){
    this.users = this.listofUsers.filter(user =>
      user.userName.toLowerCase().includes(this.searchText.toLowerCase()))
  }

  /**
   * Calls the banUser method on the given user.
   */
  banning(user: User) {
    user.active = !user.active;
    this.adminservice.banUser(user);
  }

}
