import { Component, OnInit, Input } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { ScheduleService } from 'src/app/services/schedule-service/schedule.service';

@Component({
  selector: 'app-trips-table',
  templateUrl: './trips-table.component.html',
  styleUrls: ['./trips-table.component.css'],
})
export class TripsTableComponent implements OnInit {
  constructor(private scheduleService: ScheduleService) { }

  @Input() trips: Trip[];
  @Input() riderTrips: Trip[];
  @Input() caption: string;
  public id: number;

  ngOnInit() {
    this.id = parseInt(sessionStorage.getItem('userid'), 10);
  }

  addTrip(trip: Trip) {
    this.scheduleService.addTrips(trip, this.id).subscribe();
  }

  removeTrip(trip: Trip) {
    this.scheduleService.removeTrips(trip, this.id).subscribe();
  }

  refresh() {
    window.location.reload();
  }

  onTrip(trip: Trip): boolean {
    let isOnTrip = false;

    if (this.riderTrips !== null) {
      this.riderTrips.forEach(riderTrip => {
        if (trip.tripId === riderTrip.tripId) {
          isOnTrip = true;
        }
      });
    }

    return isOnTrip;
  }
}
