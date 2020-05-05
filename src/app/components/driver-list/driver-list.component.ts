import { Component, OnInit, ViewChild } from '@angular/core';

import { UserService } from 'src/app/services/user-service/user.service';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CarService } from 'src/app/services/car-service/car.service';

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
<<<<<<< HEAD
    this.currentUserID = +sessionStorage.getItem('userid');

    // sets the location to the driver's home address
    this.userService.getDriverById(this.currentUserID).subscribe(
      (currentUser) => {

        let currentAddress = currentUser.homeAddress;
        this.location = currentAddress.street + ", " + currentAddress.city + ", " + currentAddress.state;

        this.getGoogleApi();

        this.userService.getRidersForLocation1(this.location).subscribe(
          (res) => {
            res.forEach(element => {
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
=======

    this.userService.getRidersForLocation1(this.location).subscribe(
      res => {
           //console.log(res);
           res.forEach(element => {
              this.drivers.push({
                   'id': element.userId,
                 'name': element.firstName+" "+element.lastName,
               'origin':element.hCity+","+element.hState, 
                'email': element.email, 
                'phone':element.phoneNumber
              });
          });
      });
    


    this.sleep(2000).then(() => {
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
>>>>>>> 72cf0791ebe761ab8e693d8643cf13a8dab1544d
  }

  /**
  * Inserts the google maps api script into the document head. 
  */  
  getGoogleApi() {
    if (environment.googleMapKey !== undefined) {
      const script: HTMLScriptElement = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapKey}`;
      document.head.appendChild(script);
    }
  }
  
<<<<<<< HEAD
=======



>>>>>>> 72cf0791ebe761ab8e693d8643cf13a8dab1544d
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
      //avoidTolls: true
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
      var availableSeats: number;
      var totalSeats: number;

      this.carService.getCarTripByUserId(element.id).subscribe(
        (carTrip) => {
          // @ts-ignore
          availableSeats = carTrip.currentTrip.availableSeats;
          // @ts-ignore
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