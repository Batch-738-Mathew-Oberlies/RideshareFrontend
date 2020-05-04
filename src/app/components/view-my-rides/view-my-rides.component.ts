import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { ScheduleService } from 'src/app/services/schedule-service/schedule.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-my-rides',
  templateUrl: './view-my-rides.component.html',
})
export class ViewMyRidesComponent implements OnInit {
  
  constructor(private serv: ScheduleService) { }

  public caption='My Rides';
  public id: number = +sessionStorage.getItem("userid");
  public tripsObs: Observable<Trip[]> = this.serv.getRiderTrips(this.id);
  public riderTripsObs: Observable<Trip[]> = this.tripsObs;

  ngOnInit() {}
}