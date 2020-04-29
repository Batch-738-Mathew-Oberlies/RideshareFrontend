import { Injectable } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  public url: string = environment.tripUri;

  constructor(private http: HttpClient) { }

  getTrips(): Observable<Trip[]> { 
    return this.http.get<Trip[]>(this.url);
  }

  getRiderTrips(id: number): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.url+`rider/?riderId=${id}`);
  }

  addTrips(t: Trip, id: number) {
    return this.http.post<Trip>(this.url+`rider/?tripId=${t.tripId}&riderId=${id}`, t);
  }
  
  removeTrips(t: Trip, id: number) {
    return this.http.delete<Trip>(this.url+`rider/?tripId=${t.tripId}&riderId=${id}`);
  }
}

