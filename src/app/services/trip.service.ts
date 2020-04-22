import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

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
   * Creates a new user object
   */   
  url: string = environment.userUri;
  constructor() { }
}
