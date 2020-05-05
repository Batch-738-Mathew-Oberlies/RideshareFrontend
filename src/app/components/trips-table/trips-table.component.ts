import { Component, OnInit, Input } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { ScheduleService } from 'src/app/services/schedule-service/schedule.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.css'],
})
export class TripsTableComponent implements OnInit {

  constructor(private serv: ScheduleService, private auth: AuthService) { }

  @Input('trips') trips: Trip[];
  @Input('riderTrips') riderTrips: Trip[];
  @Input('caption') caption: String;
  public id: number;

  ngOnInit() {
    this.id=+sessionStorage.getItem("userid");
  }

  addTrip(t: Trip) {
    this.serv.addTrips(t,this.id).subscribe();
  }

  removeTrip(t: Trip) {
    this.serv.removeTrips(t,this.id).subscribe();
  }
  
  refresh() {
    window.location.reload();
  }
  
  onTrip(t: Trip): boolean {
    let isTrip: boolean = false;

    this.riderTrips.forEach(trip => {
      if(t.tripId === trip.tripId) {
        isTrip=true;
      };
    });

    return isTrip;
  }
}
