import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/address';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
   /**
    * This is the contructor for the validation service.
	*/
  constructor() { }
  
   /** 
  * this function validates the number of seats of the car.
  * @function
  * @returns {boolean}
  */
  validateSeats(seats: number) {
    return seats > 0 && seats <= 6 && seats % 1 === 0;
  }


//   this function checks for special characters in the username and validates the length
  validateUserName(userName: string) {
		return /^\w+\.?\w+$/.test(userName) && userName.length >= 3 && userName.length <= 12;
	}

  /**
	 * This function is validates the length of the name and checks if there is any numeric values in the name string.
	 */
	validateName(name: string) {
		return /^[a-zA-Z\u00C0-\u017F]+[- ]?[a-zA-Z\u00C0-\u017F]+$/.test(name) && name.length < 30;
	}

  /**
	 * This function checks the email that the user entered.
	 */
	validateEmail(email: string) {
		return /^\w+\.?\w+@\w+\.[a-zA-Z]{2,4}$/.test(email);
	}

  /**
	 * This function validates the phone number.
	 */
	validatePhone(phone: string) {
		return /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(phone);
  }
  
  /**
	 * This function formats the name string.
	 */
	nameFormat(name: string) {

		let newName: string = "";
		
		newName += name[0].toUpperCase();

		for (let i = 1; i < name.length; i++) {
			if (name.charAt(i) === " " || name.charAt(i) === "-") {
				newName += name[i];
				newName += name[i+1].toUpperCase();
				i++;
			} else {
				newName += name[i].toLowerCase();
			}
		}

		return newName;
	}

  /**
	 * This function formats the phone number.
	 */
	phoneFormat(phone: string) {
		return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
	}

	
	validateAddress(address: Address) {
		let url = "https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=";
    	//need to hide this API userID------------>____________
		let xml = `<AddressValidateRequest USERID="605REVAT4789"><Revision>1</Revision><Address ID="0"><Address1>${address.apt}</Address1><Address2>${address.street}</Address2><City>${address.city}</City><State>${address.state}</State><Zip5>${address.zip}</Zip5><Zip4/></Address></AddressValidateRequest>`;

		return fetch(url + xml)
        .then(response => {
          return response.text();
		})
		.then(text => {
			//Parse the string returned into an XML document
			let parser = new DOMParser();
			let xmlDoc = parser.parseFromString(text, 'text/xml');
			//We can filter the Collection array to contain specified tags that we want by inputing the localName
			let desc = xmlDoc.getElementsByTagNameNS("*", "Description"); //Only found if address is invalid
			let rT = xmlDoc.getElementsByTagNameNS("*", "ReturnText"); //Only found if address needs more info
			let fullResponse = xmlDoc.getElementsByTagNameNS("*", "*"); //Returns entire array
			console.log(fullResponse);
			//Checks to see if address is Valid
			let addressReference = new Address();
			if(desc.length <= 0 && rT.length <= 0){ //If address is valid
				console.log(fullResponse[2].textContent);
				if (fullResponse.length == 17) {
					addressReference.apt = fullResponse[2].textContent;
					addressReference.street = fullResponse[3].textContent;
					addressReference.city = fullResponse[4].textContent;
					addressReference.state = fullResponse[5].textContent;
					addressReference.zip = fullResponse[6].textContent;

					if (confirm(`We found this address. Would you like to continue with this address or make a change?` + `\n\n${addressReference.street}, ${addressReference.apt}\n${addressReference.city}, ${addressReference.state} ${addressReference.zip}`).valueOf()) {
						return false;
					} else {
						return true;
					}
		
				} else if (fullResponse.length == 16) {
					addressReference.apt = '';
					addressReference.street = fullResponse[2].textContent;
					addressReference.city = fullResponse[3].textContent;
					addressReference.state = fullResponse[4].textContent;
					addressReference.zip = fullResponse[5].textContent;
					console.log(addressReference, address)

					if (confirm(`We found this address. Would you like to continue with this address or make a change?` + `\n\n${addressReference.street}, ${addressReference.apt}\n${addressReference.city}, ${addressReference.state} ${addressReference.zip}`).valueOf()) {
						return false;
					} else {
						return true;
					}

				}

				

				

				// addressReference.street = fullResponse[1].textContent

				return false;
			
			}else if(desc.length>0 && rT.length<=0){ //If address is invalid
				alert("An error occured when validating your address. " + desc[0].textContent)
				return true;

			} else if(desc.length<=0 && rT.length>0){ //If address is valid but needs more info
				alert("An error occured when validation your address " + rT[0].textContent)	
				return true;

			}
			
		})
	}
	
	capitalizeFirstLetter(s): String {
		if (typeof s !== 'string') return null;
		return s.charAt(0).toUpperCase() + s.slice(1)
	}
  
}
