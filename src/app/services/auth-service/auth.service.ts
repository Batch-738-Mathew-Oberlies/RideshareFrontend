import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Admin } from 'src/app/models/admin';


@Injectable({
  	providedIn: 'root'
})
/**
 * The authorization service.
 */
export class AuthService {


	@Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();
	 loggedIn: boolean = false;


	/**
	 * Creates a router instance
	 * @param router 
	 */
	constructor(private router: Router) { }

	/**
	 * A user object is created
	 */
	public user: any = {};
	public admin: Admin = new Admin();

	/**
	 * Logs the user into the application if their username matches, and then redirects them
	 * based on whether they are a driver or a rider.
	 * @param user 
	 * @param chosenUserName 
	 */

	login(user: User, chosenUserName: string) {
		if (user.userName === chosenUserName) {
			this.user = user;
			if(this.user.driver){
				this.router.navigate(['/home/riders']);
			}
			else{
				this.router.navigate(['/home/drivers']);
			}
			
			this.fireIsLoggedIn.emit(this.user);
		} else {
			return false;
		}
	}

	/**
	 * This function returns an emitter.
	 */

	loginAsAdmin(admin: Admin, userName: string) {
		if (admin.userName === userName) {
			this.admin = admin;
			this.router.navigate(['/admin']);
			this.fireIsLoggedIn.emit(this.admin);
		} else {
			return false;
		}
	}

	getEmitter() {
		return this.fireIsLoggedIn;
	}
}
