import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-driver-contact-modal',
  templateUrl: './driver-contact-modal.component.html',
  styleUrls: ['./driver-contact-modal.component.css']
})
/**
 * The DriverContactModalComponent component.
 */
export class DriverContactModalComponent implements OnInit {

  origin : string = 'Morgantown, WV';
  mapProperties :{};
  availableCars : Array<any> = [];

  @ViewChild('maps',null) mapElement: any;
  map: google.maps.Map;
  constructor(private http: HttpClient) { }

  /**
   * Initializes the component by calling its methods.
   */
  ngOnInit() {

    this.sleep(2000).then(() => {
     //show drivers on map
     this.showDriversOnMap(sessionStorage.getItem("origin"), sessionStorage.getItem("destination"));

    });
  }
  /**
   * Sends a promise after the given number of milliseconds.
   * @param ms
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Inititates services from the google maps api needed for displaying the route, and then
   * calls displayRoute()/
   * @param origin
   * @param destination
   */
  showDriversOnMap(origin, destination){

      var directionsService = new google.maps.DirectionsService;
      var directionsRenderer = new google.maps.DirectionsRenderer({
         draggable: true,
         map: this.map
       });
       this.displayRoute(origin, destination, directionsService, directionsRenderer);

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
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
      //avoidTolls: true
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

}
