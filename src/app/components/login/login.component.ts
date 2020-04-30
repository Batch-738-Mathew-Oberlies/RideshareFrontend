import { Component, OnInit, TemplateRef } from '@angular/core';
import { UserService } from 'src/app/services/user-service/user.service';
import { User } from 'src/app/models/user';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef} from 'ngx-bootstrap';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})


/**
 * This is the login component
 */
export class LoginComponent implements OnInit {

	/**
	 * Creates an array of Users
	 * Creates an array of all Users
	 * Sets a chosen user object
	 * Sets name string variable to the chosen user
	 * Sets pagination
	 */

	users: User[] = [];
	allUsers: User[] = [];
	

	chosenUser: User;
	chosenUserFullName: string = '';
	userName: string = '';
	passWord: string = '';
	totalPage: number = 1;
  	curPage: number = 1;

	showDropDown: boolean = false;
	failed: boolean = false;
	banned: boolean = false;

	pwdError: string;
    usernameError: string;
	userNotFound: string;
	modalRef :BsModalRef;
	/**
	 * This is a constructor
	 * @param userService An user service is instantiated.
	 * @param router A router service is injected.
	 * @param http A HTTP Client is created.
	 * @param authService An auth service is injected.
	 *
	 */
	constructor(private modalService :BsModalService,private userService: UserService, private http: HttpClient, private authService: AuthService, public router: Router) { }

	/**
	 * When the component is initialized, the system checks for the session storage to validate. Once validated, the user service is called to retrieve all users.
	 */
	ngOnInit() {
		this.userService.getAllUsers()
			.subscribe(allUsers => {
				this.allUsers = allUsers;
				this.totalPage = Math.ceil(this.allUsers.length / 5);
				this.users = this.allUsers.slice(0, 5);
		});
	}

	/**
	 * A function that allows the user to choose an account to log in as
	 * @param user
	 */

	changeUser(user) {
		this.showDropDown = false;
		this.curPage = 1;
		this.totalPage = Math.ceil(this.allUsers.length / 5);
		this.users = this.allUsers.slice(this.curPage * 5 - 5, this.curPage * 5);
		this.chosenUserFullName = `${user.firstName} ${user.lastName}: ${user.driver ? 'Driver' : 'Rider'}`;
		this.chosenUser = user;
	}

	/**
	 * A GET method the fetches all the users
	 */

	searchAccount() {
		this.showDropDown = true;
		if (this.chosenUserFullName.length) {
			this.users = this.allUsers.filter(user => {
				return (
					user.firstName.toLowerCase().startsWith(this.chosenUserFullName.toLowerCase()) ||
					user.lastName.toLowerCase().startsWith(this.chosenUserFullName.toLowerCase()) ||
					`${user.firstName} ${user.lastName}`.toLowerCase().startsWith(this.chosenUserFullName.toLowerCase()) ||
					`${user.firstName} ${user.lastName}: ${user.isDriver ? 'Driver' : 'Rider'}`.toLowerCase().startsWith(this.chosenUserFullName.toLowerCase())
				);
			});
			this.totalPage = Math.ceil(this.users.length / 5);
		} else {
			this.curPage = 1;
			this.totalPage = Math.ceil(this.allUsers.length / 5);
			this.users = this.allUsers.slice(this.curPage * 5 - 5, this.curPage * 5);
		}
	}

	/**
	 * Toggles whether the dropdown is displayed.
	 */

	toggleDropDown() {
		this.showDropDown = !this.showDropDown;
	}

	/**
	 * Increments the current page of user search results.
	 */
	nextPage() {
		this.curPage++;
		this.users = this.allUsers.slice(this.curPage * 5 - 5, this.curPage * 5);
	}

	/**
	 * Decrements the current page of user search results.
	 */

	prevPage() {
		this.curPage--;
		this.users = this.allUsers.slice(this.curPage * 5 - 5, this.curPage * 5);
	}

	/**
	 * A function to handle failed logins.
	 */


	loginFailed() {
		this.userName = '';
		this.failed = true;
	}

	/**
	 * Handles attempts by banned users to log in.
	 */
	loginBanned(){
		this.userName = '';
		this.banned = true;
	}

	/**
	 * Opens the given modal template.
	 * @param template 
	 */
	openModal(template :TemplateRef<any>){
		this.modalRef = this.modalService.show(template);
		
	}

	/**
	 * A login function which directly sends a get request to the login uri containing username and
	 * password, and attempts to log in as that user.
	 */

	login() {
		this.pwdError ='';
		this.usernameError= '';
		
        this.http.get(`${environment.loginUri}?userName=${this.userName}&passWord=${this.passWord}`)
			.subscribe(
                  (response) => {
                      if(response["userName"] != undefined){
                         this.usernameError=  response["userName"][0];
                      }
                      if(response["passWord"] != undefined){
                         this.pwdError = response["pwdError"][0];
					  }
					  if((response["name"] != undefined) && (response["userid"] != undefined)){
						sessionStorage.setItem("name", response["name"]);
						sessionStorage.setItem("userid", response["userid"]);
						
						//This was added to get an user from the back end and store it in the session storage.
						//You can retrieve the user from the session storage by using the method retrieveUser
						//	from the user-service.
						const userId: number = parseInt(sessionStorage.getItem('userid'), 10);
						this.userService.getUserById3(userId).subscribe((user: User) => {
							if (user !== null) {
								this.userService.storeUser(user);
							}
							location.replace('landingPage');
						  });
						//call landing page
						location.replace('landingPage');
					  }
					  if(response["userNotFound"] != undefined){
						this.userNotFound = response["userNotFound"][0];
					  }
                 }
        );
		
	}


}
