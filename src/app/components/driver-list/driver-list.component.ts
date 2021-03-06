import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from 'src/app/services/user-service/user.service';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CarService } from 'src/app/services/car-service/car.service';
import { Car } from 'src/app/models/car';
import { Trip } from 'src/app/models/trip';
import { CarTrip } from 'src/app/models/car-trip';

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver-list.component.css']
})
/**
 * The DriverListComponent component.
 *
 * Large portions of this component are duplicated from driver-contact-modal.
 */
export class DriverListComponent implements OnInit {

  location : string = '';
  mapProperties :{};
  availableCars : Array<any> = [];
  drivers : Array<any> = [];
  availableDrivers;
  currentUserID: number; // sessionStorage 'userid' value
  
  @ViewChild('map', null) mapElement: any;
  map: google.maps.Map;

  constructor(private http: HttpClient, private userService: UserService, private carService: CarService) { }

  ngOnInit() {
    this.drivers = [];
    this.currentUserID = +sessionStorage.getItem('userid');

    // sets the location to the driver's home address
    this.userService.getDriverById(this.currentUserID).subscribe(
      (currentUser) => {

        let currentAddress = currentUser.homeAddress;
        this.location = currentAddress.street + ", " + currentAddress.city + ", " + currentAddress.state;

        this.userService.getRidersForLocation1(this.location).subscribe(
          (allDrivers) => {
            allDrivers.forEach(element => {
              // check to see that the currentUserID is not equal to the element userId
              if (element.userId != this.currentUserID) {
                // If not, then add it to the drivers list.
                this.drivers.push({
                  'id': element.userId,
                  'name': element.firstName+" "+element.lastName,
                  'origin':element.homeAddress.city+","+element.homeAddress.state,
                  'email': element.email,
                  'phone':element.phoneNumber,
                });
              }
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
          }
        );
      }
    )
  }
  
  /**
  * Inititates services from the google maps api needed for displaying the route, and then
  * calls displayRoute()/
  * @param origin 
  * @param destination 
  */
  showDriversOnMap(origin, drivers) {
     drivers.forEach(element => {
      let directionsService = new google.maps.DirectionsService;
      let directionsRenderer = new google.maps.DirectionsRenderer({
         draggable: true,
         map: this.map
       });
      this.displayRoute(origin, element.origin, directionsService, directionsRenderer);
    });
  }

/**
 * Uses the given service of type google.maps.DirectionsService and display of type
 * google.maps.DirectionsRenderer to compute the route and display it on the map.
 * @param origin
 * @param destination
 * @param service
 * @param display
 */
displayRoute(origin, destination, service, display) {
    service.route({
      origin,
      destination,
      travelMode: 'DRIVING',

    }, (response, status) => {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

/**
 * Displays a list of drivers, appended directly to the DOM.
 * @param origin
 * @param drivers
 */
displayDriversList(origin, drivers) {
    let  origins = [];
    origins.push(origin)
    this.availableDrivers = [];

    drivers.forEach(element => {
      var availableSeats: number = 0;
      var totalSeats: number = 0;

      this.carService.getCarTripByUserId(element.id).subscribe(
        (carTrip) => {
          if (availableSeats == undefined)
            availableSeats = 0;
          else
            availableSeats = carTrip.currentTrip.availableSeats;
          if (totalSeats == undefined)
            totalSeats = 0;
          else
            totalSeats = carTrip.car.seats;
        }
      );
      
      let service = new google.maps.DistanceMatrixService;
      service.getDistanceMatrix({
        origins,
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

          this.availableDrivers.push({
            label: `exampleModalCentered${element.id}`,
            origin: originList,
            destinationList: destinationList,
            results: results,
            seats: availableSeats + "/" + totalSeats,
            user: {
              id: element.id,
              name: element.name,
              email: element.email,
              phone: element.phone
            },
          })
        }
      });
   });
  }
}