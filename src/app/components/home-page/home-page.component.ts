import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  errorText: string; //Contains some error message

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }


  /**
   * Used to test http get request to USPS API for address valiidation
   */
  test(){
    let url = "https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=";
    //need to hide this API userID------------>____________Aventura
    let xml = `<AddressValidateRequest USERID="605REVAT4789"><Revision>1</Revision><Address ID="0"><Address1>C</Address1><Address2>58 Stonehurst Blvd</Address2><City>FREEHOLD</City><State>NJ</State><Zip5>07728</Zip5><Zip4/></Address></AddressValidateRequest>`;
    
    //Parameters needed
    //Address and apt number(if applicable; Must include the 'Apt' before apartment number)
    //City
    //State
    //Zip Code

    //The full URL that is sent to API
    console.log(url + xml);

    //Fetching the response from the API
    fetch(url + xml)
        .then(response => {
          return response.text();
    })
      .then(text => {
        console.log(text);

        //Parse the string returned into an XML document
        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(text, 'text/xml');

        //getElementsByTagNameNS makes the xmlDoc into a HTMLCollection array
        //We can filter the Collection array to contain specified tags that we want by inputing the localName
        let desc = xmlDoc.getElementsByTagNameNS("*", "Description"); //Only found if address is invalid
        let rT = xmlDoc.getElementsByTagNameNS("*", "ReturnText"); //Only found if address needs more info
        console.log(xmlDoc.getElementsByTagNameNS("*", "*")); //Returns entire array

        // console.log(desc);
        
        //Checks to see if address is Valid
        if(desc.length <= 0 && rT.length <= 0){ //If address is valid
          console.log("Valid Address");
        }else if(desc.length>0 && rT.length<=0){ //If address is invalid
          console.log("Invalid");
          console.log(desc[0].textContent);

          this.errorText = desc[0].textContent;
          alert(this.errorText);

        } else if(desc.length<=0 && rT.length>0){ //If address is valid but needs more info
          console.log("Valid but need more info");
          console.log(rT[0].textContent);

          this.errorText = rT[0].textContent;
            alert(this.errorText);

        }
        
      })
}

}
