import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user-service/user.service';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { Batch } from 'src/app/models/batch';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car-service/car.service';
import { Router } from '@angular/router';
import { BatchService } from 'src/app/services/batch-service/batch.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
export class DriverListComponent implements OnInit {

  location : string = 'Morgantown, WV';
  mapProperties :{};
  availableCars : Array<any> = [];
  drivers : Array<any> = [];
  availableDrivers;


  @ViewChild('map',null) mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient,private userService: UserService, private carService: CarService) { }

  ngOnInit() {
    this.drivers = [];
    this.getGoogleApi();
    
    this.userService.getRidersForLocation1(this.location).subscribe(
      (res) => {
        res.forEach(element => {
          this.drivers.push({
            'id': element.userId,
            'name': element.firstName+" "+element.lastName,
            'origin':element.haddress.city+","+element.haddress.state,
            'email': element.email,
            'phone':element.phoneNumber,
          });
        });
        
        this.mapProperties = {
          center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
        
        //get all routes
        this.displayDriversList(this.location, this.drivers);
        //show drivers on map
        this.showDriversOnMap(this.location, this.drivers);
        });
    
  }

  getGoogleApi() {
    if (environment.googleMapKey !== undefined) {
      const script: HTMLScriptElement = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapKey}`;
      document.head.appendChild(script);
    }
  }

  showDriversOnMap(origin, drivers){
     drivers.forEach(element => {
      var directionsService = new google.maps.DirectionsService;
      var directionsRenderer = new google.maps.DirectionsRenderer({
         draggable: true,
         map: this.map
       });
       this.displayRoute(origin, element.origin, directionsService, directionsRenderer);
    });
  }


  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
      //avoidTolls: true
    }, (response, status) => {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }


  displayDriversList(origin, drivers) {
    let  origins = [];
    //set origin
    origins.push(origin)
    this.availableDrivers = [];

    drivers.forEach(element => {
      var availableSeats: number;
      var totalSeats: number;

      this.carService.getCarByUserId2(element.id).subscribe(
        (result) => {
          console.log(result);
          availableSeats = result.availableSeats;
          totalSeats = result.seats;
        }
      );
      var service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins: origins,
        destinations: [element.origin],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
        avoidHighways: false,
        avoidTolls: false
      }, (response, status) => {
        if (status !== 'OK') {
          alert('Error was: ' + status);
        } else {
          
          const originList = response.originAddresses;
          const destinationList = response.destinationAddresses;
          const results = response.rows[0].elements;
          console.log(results[0].distance.text);

          this.availableDrivers.push({
            label: `exampleModalCentered${element.id}`,
            origin: originList,
            destinationList: destinationList,
            results: results,
            user: {
              id: element.id,
              name: element.name,
              email: element.email,
              phone: element.phone
            },
            availableSeats: availableSeats,
            totalSeats: totalSeats
          })
        }
      });
   });
   console.log(this.availableDrivers);
  }

}
