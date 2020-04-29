import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import {ScheduleService} from 'src/app/services/schedule-service/schedule.service';
import {Observable} from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-schedule',
  templateUrl: '../trips.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit 
{
  public trips: Trip[];
  public riderTrips: Trip[]=[];
  public id: number;
  
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
          data => this.riderTrips=data
          );

        this.serv.getTrips().subscribe(
        data => this.trips=data
        );
      }
  }
  addTrip(t: Trip)
  {
    this.serv.addTrips(t,this.id).subscribe(()=>this.onTrip(t));
  }
  removeTrip(t: Trip)
  {
    this.serv.removeTrips(t,this.id).subscribe();
  }
  refresh()
  {
    window.location.reload();
  }
  onTrip(t: Trip): boolean
  {
    let isTrip: boolean = false;

    this.riderTrips.forEach(trip => {
      if(t.tripId === trip.tripId)
      {
        isTrip=true;
      }
    });

    return isTrip;
  }
}