import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import {ScheduleService} from 'src/app/services/schedule-service/schedule.service';
import {AuthService} from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-view-my-rides',
  templateUrl: '../trips.component.html',
  styleUrls: ['./view-my-rides.component.css']
})
export class ViewMyRidesComponent implements OnInit {

  trips: Trip[];
  id: number;

  /**
   * This is a constructor
   * @param authService An authorization service
   */
  constructor(private serv: ScheduleService, private auth: AuthService) 
  { 
  
  }

  ngOnInit() 
  {
    this.id=+sessionStorage.getItem("userid");
    
    if(!this.id)
    {
      console.log("No userId associated with login.")
    }
    else
    {
    this.serv.getRiderTrips(this.id).subscribe(
      data => this.trips=data
       );
    }
  }

  removeTrip(t: Trip)
  {
    this.serv.removeTrips(t, this.id).subscribe();
  }
  
  refresh()
  {
    window.location.reload();
  }
  onTrip(t: Trip): boolean
  {
    let isTrip: boolean = false;

    this.trips.forEach(trip => {
      if(t.tripId === trip.tripId)
      {
        isTrip=true;
      }
    });

    return isTrip;
  }
}

