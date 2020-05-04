import { Component, OnInit } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user-service/user.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
/**
 * The landing-page component.
 */
export class LandingPageComponent implements OnInit {

  location_s : string =''; //sample: Morgantown, WV
 
  @ViewChild('map', {static: true}) mapElement: any;
  map: google.maps.Map;
  
  mapProperties :{};

  constructor(private http: HttpClient,private userService: UserService) {
  }

  ngOnInit(): void {
    //load google map  api
    this.getGoogleApi();
 }

/**
 * Resolves a promise after the given number of milliseconds.
 * @param ms 
 */
sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Loads the google map into the page. The google api must be done loading into the page before this is called
 */
loadMap(){
  this.mapProperties = {
    center: new google.maps.LatLng(Number(sessionStorage.getItem("lat")), Number(sessionStorage.getItem("lng"))),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
}
/**
 * Inserts the google maps api script into the document head. This seems to be duplicated code.
 * Duplicate code.
 */
  getGoogleApi()  {
    this.http.get(`${environment.loginUri}getGoogleApi`)
    .subscribe(
      (response) => {
        if(response["googleMapAPIKey"] != undefined){
          new Promise((resolve) => {
            let script: HTMLScriptElement = document.createElement('script');
            script.addEventListener('load', r => resolve());
            script.src = `https://maps.googleapis.com/maps/api/js?key=${response["googleMapAPIKey"][0]}`;
            document.head.appendChild(script);      
          }) 
          .then(() => {
            this.loadMap();
          });
        }    
      }
    );
  }

 /**
  * Searches for drivers, collects the google maps services, and calls the display route method.
  * VERY similar to the showDriversOnMap method found in driver-contact-modal and driver-list.
  */
 searchDriver(){
  //call service search algorithm ()
  this.map = new google.maps.Map(this.mapElement.nativeElement, this.mapProperties);
  this.userService.getRidersForLocation1(this.location_s)
    .subscribe(
      (response) => {
        response.forEach(driver => {
          let directionsService = new google.maps.DirectionsService;
          let directionsRenderer = new google.maps.DirectionsRenderer({
            draggable: true,
            map: this.map
          });
          this.displayRoute(this.location_s, driver.homeAddress.city+","+driver.homeAddress.state, directionsService, directionsRenderer);
        });
    });
 }

/**
 * Uses the given service of type google.maps.DirectionsService and display of type
 * google.maps.DirectionsRenderer to compute the route and display it on the map.
 * 
 * Duplicated code.
 * @param origin 
 * @param destination 
 * @param service 
 * @param display 
 */
  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      //waypoints: [{location: 'Adelaide, SA'}, {location: 'Broken Hill, NSW'}],
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