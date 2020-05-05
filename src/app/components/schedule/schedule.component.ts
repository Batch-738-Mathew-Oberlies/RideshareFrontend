import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { ScheduleService } from 'src/app/services/schedule-service/schedule.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent implements OnInit {
  constructor(private serv: ScheduleService) { }

  public caption='Trip Schedule';
  public tripsObs: Observable<Trip[]> = this.serv.getTrips();
  public id: number = +sessionStorage.getItem("userid");
  public riderTripsObs: Observable<Trip[]> = this.serv.getRiderTrips(this.id);

  ngOnInit() {}
}
