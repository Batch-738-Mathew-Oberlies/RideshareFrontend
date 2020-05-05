import { Component } from '@angular/core';
import {} from 'googlemaps';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


/**
 * This is the App Component.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /**
   * This is the title of the Application.
   */
  title = 'rideshare-frontend';
  googleMapAPIKey: string;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getGoogleApi();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        sessionStorage.setItem("lat", position.coords.latitude+"");
        sessionStorage.setItem("lng", position.coords.longitude+"");
      })
    }
  } 

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
            }); 
          }    
        }
      );
  }
}