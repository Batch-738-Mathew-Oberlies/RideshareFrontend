import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import {ScheduleService} from 'src/app/services/schedule-service/schedule.service';
import {AuthService} from 'src/app/services/auth-service/auth.service';
import {User} from 'src/app/models/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-view-my-rides',
  templateUrl: './view-my-rides.component.html',
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
}

