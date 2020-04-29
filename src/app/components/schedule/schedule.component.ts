import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import {ScheduleService} from 'src/app/services/schedule-service/schedule.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';


@Component({
  selector: 'app-schedule',
  templateUrl: '../trips.component.html',
})
export class ScheduleComponent implements OnInit 
{
  public caption='Trip Schedule';
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
        this.serv.getTrips().subscribe(
        data => this.trips=data
        );

       this.serv.getRiderTrips(this.id).subscribe(
        data => {this.riderTrips=data;
          if(this.riderTrips === null){
            this.riderTrips = [];
          }
        });
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