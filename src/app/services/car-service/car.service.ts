import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Car } from 'src/app/models/car';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { UserService } from '../user-service/user.service';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Trip } from 'src/app/models/trip';
import { CarTrip } from 'src/app/models/car-trip';

@Injectable({
    providedIn: 'root'
})
/**
 * The car service.
 */
export class CarService {
	/**
	 * Set the url string to the env var
	 * An user is created.
	 */

    url: string = environment.carUri;
	user: User = new User();

	/**
	 * Constructor injects a HTTP client, a router and an user service
	 * @param http An HTTP client
	 * @param router A router
	 * @param userService An user service
	 */

	constructor(private http: HttpClient, private router: Router, private userService: UserService) { }

	/**
	 * Fetches all cars from the database.
	 */

	getAllCars(): Observable<Car[]> 
	{
		return this.http.get<Car[]>(this.url);
	}

	/**
	 * Returns a car by user ID.
	 * @param userId
	 */

	getCarByUserId(userId: number) {
		return this.http.get<Car>(`${this.url}users/${userId}`).toPromise();
	}

	/**
	 * Identical to the above method except that it returns an observable.
	 * @param userId
	 */
	getCarByUserId2(userId: string): Observable<Car> {
		return this.http.get<Car>(`${this.url}users/${userId}`);
	}

	/**
	 * Returns a car and current trip by user ID.
	 * @param userId 
	 */
	getCarTripByUserId(userId: any): Observable<CarTrip> {
		return this.http.get<CarTrip>(`${this.url}trips/driver/${userId}`)
	}
  
  /**
   * Updates information on car and current trip by userId
   * @param car 
   * @param trip 
   */
  updateCarTrip(car: Car, trip: Trip) {
    let carTrip : CarTrip = new CarTrip(car, trip);
    return this.http.put(`${this.url}trips`, carTrip);
  }

	/**
	 * Updates information on a car
	 * @param car 
	 */
	updateCarInfo(car: Car) {
		return this.http.put(`${this.url}${car.carId}`, car).toPromise();
	}

	/**
	 * Identical to the above method except that it returns an observable.
	 * @param userId 
	 */
	updateCarInfo2(car: Car): Observable<Car> {
		return this.http.put<Car>(`${this.url}${car.carId}`, car);
	}

	/**
	 * Creates a car.
	 * @param car
	 */
	createCar(car: Car): Observable<Car> {
		return this.http.post<Car>(`${this.url}`, car);
	}

	/**
	 * Deletes the car with the given id from the database.
	 * @param carId
	 */

	removeCar(carId: number) {
		return this.http.delete<Car>(this.url+carId);
	}
}
