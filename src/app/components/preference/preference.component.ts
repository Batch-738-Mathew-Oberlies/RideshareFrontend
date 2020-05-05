import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth-service/auth.service';

/**
 * A navbar component.
 */

@Component({
  selector: 'app-preference',
  templateUrl: './preference.component.html',
  styleUrls: ['./preference.component.css']
})
export class PreferenceComponent implements OnInit {

  /**
   * Once the component is initialzed, a user object is created.
   * 
   */

  user: User = new User();

  truthy: string = 'btn btn-success';
  falsy: string = 'btn btn-danger';

  /**
   * This is the constructor
   * @param router A router service is created
   * @param userService A user service is created
   * @param authService An auth service is created
   */

  constructor(private router: Router, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.user.userId = this.authService.user.userId;
    if (!this.user.userId) {
      this.router.navigate(['']);
    } else {
      this.getPreference();
    }
  }

  /**
   * 
   * Fetches the user given by this component's user field from the database.
   */

  getPreference() {
    this.userService.getUserById(this.user.userId).then(response => {
      if (response) {
        this.user = response;
      } else {
        this.authService.user = {};
        this.router.navigate(['']);
      }
    })
  }

 /**
   * 
   * Changes the account from active to inactive.
   */


  toggleActive() {
    if (this.user.active) {
      let text = prompt("Your Account Will Be Banned. Type 'Confirm' To Continued");
      if (text === 'Confirm') {
        this.user.active = !this.user.active;
        this.user.acceptingRides = false;
        this.userService.updatePreference('active', this.user.active, this.user.userId);
      }
    } else {
      this.user.active = !this.user.active;
      this.userService.updatePreference('active', this.user.active, this.user.userId);
    }
    
  }
 /**
   * 
   * Changes the driver account from accepting rides to not accepting rides.
   */

  toggleAcceptRider() {
    this.user.acceptingRides = !this.user.acceptingRides;
    this.userService.updatePreference('acceptingRides', this.user.acceptingRides, this.user.userId);
  }
}
