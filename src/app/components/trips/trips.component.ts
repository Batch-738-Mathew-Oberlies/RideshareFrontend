import { Component, OnInit } from '@angular/core';
import { TripService } from 'src/app/services/trip.service'

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

  constructor(private tripserv: TripService) { }

  ngOnInit(): void {
  }

}
