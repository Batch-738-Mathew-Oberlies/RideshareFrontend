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
  public currDate: Date;
  public showAll: boolean;

  ngOnInit() {
    this.id = parseInt(sessionStorage.getItem('userid'), 10);
    this.currDate=new Date();

    if(this.isSchedule())
    {
      this.showAll=false;
    }
    else
    {
      this.showAll=true;
    }
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

  checkDate(d: Date)
  {
    let inFuture: boolean = false;

    if(this.currDate <= new Date(d))
    {
        inFuture = true;
    }
    
    return inFuture;
  }
  
  showTrips()
  {
    this.showAll=!this.showAll;
  }

  filterByOpenSeats(t:Trip)
  {
    let show: boolean=true;
    
    if(this.showAll==false && t.availableSeats==0)
    {
        show=false;
    }

    return show;
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

  isSchedule()
  {
    let sched: boolean = false;
    if(this.caption == 'Trip Schedule')
    {
      sched=true;
    }

    return sched;
  }
}
