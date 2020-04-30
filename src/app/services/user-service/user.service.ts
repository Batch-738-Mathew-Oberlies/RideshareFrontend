import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth-service/auth.service';
import { LogService } from "../log.service"
import { environment } from '../../../environments/environment';



@Injectable({
  	providedIn: 'root'
})

/**
 * The user service
 */
export class UserService {


	@Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

	// http headers
	private headers = new HttpHeaders({'Content-Type': 'application/json'});



	/**
	 * Set up the url string to the env var
	 * Creates a new user object
	 */
	url: string = environment.userUri;
	user: User = new User();

	/**
	 * Constructor
	 * @param http An HTTP client object
	 * @param router A router
	 * @param log A log service
	 * @param authService An authorization service
	 */

	constructor(private http: HttpClient, private router: Router, private log: LogService, private authService: AuthService) { }

	/**
	 * A GET method to retrieve all users from the database
	 */

	getAllUsers() {
		return this.http.get<User[]>(this.url);
	}

	/**
<<<<<<< HEAD
	 * A GET method for one user
	 * @param idParam
=======
	 * A GET method to retrieve one user from the database with the given id. Return a promise.
	 * @param idParam 
>>>>>>> dev
	 */
	getUserById(idParam: number) {

		console.log(this.url)
		return this.http.get<User>(this.url+idParam).toPromise();


	}

<<<<<<< HEAD
  getUserById3(idParam: number): Observable<User> {

    // console.log(this.url)
    return this.http.get<User>(this.url+idParam) //.toPromise();


  }


	getUserById2(idParam2: string): Observable<User>{

=======
	
	/**
	 * Identical to the above, except that it does not give a promise.
	 * @param idParam2 
	 */
	getUserById2(idParam2: string): Observable<User>{
		
>>>>>>> dev
		//console.log(this.url)
		return this.http.get<User>(this.url+idParam2);


	}

	/**
<<<<<<< HEAD
	 * A POST method that switch an Rider to a Driver
	 * @param user
	 * @param role
=======
	 * A POST method that turns the given user into a driver
	 * @param user 
	 * @param role 
>>>>>>> dev
	 */
	createDriver(user: User, role) {

		user.active = true;
		user.isDriver = false;
		user.isAcceptingRides = false;
		console.log(user);

		this.http.post(this.url, user, {observe: 'response'}).subscribe(
			(response) => {
				this.authService.user = response.body;
				this.fireIsLoggedIn.emit(response.body);

				if (role === 'driver') {
					this.router.navigate(['new/car']);
				} else {
					this.router.navigate(['home/drivers']);
				}
			},
			(error) => {
				this.log.error(error)
			}
		);

	}

	/**
	 * Stores the given user in the database.
	 * @param user 
	 */
	addUser(user :User) :Observable<User> {
		return this.http.post<User>(this.url, user, {headers: this.headers});
	}

	/**
	 * This function returns the fireIsLoggedIn variable
	 */

	getEmitter() {
		return this.fireIsLoggedIn;
	}

	/**
<<<<<<< HEAD
	 * A PUT method that updates the user information
	 * @param isDriver
	 * @param userId
=======
	 * A PUT method that retrieves the given user from the database, updates their isDriver field,
	 * and persists the updated user in the database.
	 * @param isDriver 
	 * @param userId 
>>>>>>> dev
	 */

	updateIsDriver(isDriver, userId) {

		this.getUserById(userId)
			.then((response) => {
				this.user = response;
				this.user.isDriver = isDriver;
				this.user.isAcceptingRides = (this.user.active && isDriver);

				this.http.put(this.url+userId, this.user).subscribe(
					(response) => {
						this.authService.user = response;
						this.log.info(JSON.stringify(response));
					},
					(error) => this.log.error(error)
				);
			})
			.catch(e => {
				this.log.error(e)
			})
	}

	/**
	 * A PUT method that updates the preference of the user
	 * @param property
	 * @param bool
	 * @param userId
	 */

	updatePreference(property, bool, userId) {

		this.getUserById(userId)
			.then((response) => {
				this.user = response;
				this.user[property] = bool;
				if (property === 'active' && bool === false) {
					this.user.isAcceptingRides = false;
				}

				this.http.put(this.url+userId, this.user).subscribe(
					(response) => {
						this.authService.user = response;
					},
					(error) => console.warn(error)
				);
			})
			.catch(e => {
				this.log.error(e);
			})
	}

	/**
<<<<<<< HEAD
	 * A PUT method that updates user's information
	 * @param user
=======
	 * A PUT method that persists the given user to the database and returns a promise.
	 * @param user 
>>>>>>> dev
	 */

	updateUserInfo(user: User) {
		//console.log(user);
		return this.http.put(this.url, user).toPromise();
	}
	/**
	 * A GET method that retrieves a driver by Id
	 * @param id
	 */

	getDriverById(id: number): Observable <any>{
		return this.http.get(this.url + id);
	}

	/**
	 * A PUT method that changes the isAcceptingRide variable
	 * @param data
	 */

	changeDriverIsAccepting(data) {
		let id=data.userId;
		return this.http.put(this.url+id, data).toPromise()

	  }

	  getRidersForLocation(location: string): Observable <any>{
		return this.http.get(this.url + '?is-driver=false&location='+ location)
	  }
    /**
     * A GET method that retrieves all users from the database.
     */
		showAllUser(): Observable<any>{
		  return this.http.get(this.url);
		}

    /**
     * body to send update data
     */
      private body: string;


      private httpOptions = {
        headers: new HttpHeaders({"Content-Type": "application/json"}),
        observe: "response" as "body"
      }

    /**
     * bans the given user.
     */
    banUser(user: User){
      this.body = JSON.stringify(user);
      this.http.put(`${this.url + user.userId}`,this.body,this.httpOptions).subscribe();
	}
<<<<<<< HEAD

=======
	
	/**
	 * Retrieves drivers by location using the getTioFiveDrivers method on the User controller.
	 * Apparently, it returns a distance matrix.
	 * @param location 
	 */
>>>>>>> dev
	getRidersForLocation1(location: string): Observable <any>{
		return this.http.get(this.url + 'driver/'+ location)
	}

	/**
	 * This method will store an entire user object in session storage.
	 * @param user 
	 */
	storeUser(user: User) {
		sessionStorage.setItem('user', JSON.stringify(user));
	}
	
	/**
	 * This method will retrive the user object stored in the session storage.
	 */
	retrieveUser(): User {
		return JSON.parse(sessionStorage.getItem('user'));
	}
}
