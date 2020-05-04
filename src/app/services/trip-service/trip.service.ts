import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LogService } from '../log.service';
import {Observable} from 'rxjs';
import { Trip } from 'src/app/models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  /**
   * This is a service for trips
   */

   // http headers
   private headers = new HttpHeaders({'Content-Type': 'application/json'});

  /**
   * Set up the url string to the env var
   * Creates a new trip object
   */
  url: string = environment.tripUri;
  trip: Trip = new Trip();

  /**
   *
   * @param http An HTTP client object
   * @param router A router
   * @param log A log service
   */
  constructor(
    private http: HttpClient,
    private router: Router,
    private log: LogService
  ) { }

  /**
   * A GET method
   */
    getAllTrips() {
      return this.http.get<Trip[]>(this.url);
    }

    /**
     * A GET method for a specific trip
     * @param id id of trip requested
     */
    getTripById(id: number){
      return this.http.get<Trip>(this.url + `${id}`)
    }
    /**
     * A GET method for trips with a specific driver
     * @param id Id of driver
     */
    getTripsByDriverId(id: number){
      return this.http.get<Trip[]>(this.url + 'driver' + `/${id}`)
    }
    /**
     * A GET method for trips with a specific rider
     * @param id rider id
     */
    getTripsByRiderId(id: number){
      return this.http.get<Trip[]>(this.url + 'rider' + `/${id}`)
    }

    /**
    * A POST method to add a new trip
    */
   addTrip(trip: Trip): Observable<Trip> {
     return this.http.post<Trip>(this.url, trip);
   }

   /**
    * A PUT method to update a trip
    * @param trip trip to updated
    */
   updateTrip(trip: Trip){
     return this.http.put<Trip>(this.url, trip)
   }

   deleteTripById(id: number){
     return this.http.delete<string>(this.url + `${id}`)
   }
}