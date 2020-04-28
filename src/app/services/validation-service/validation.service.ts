import { Injectable } from '@angular/core';
import { Address } from 'src/app/models/address';
import { getTestBed } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
   /**
    * The contructor for the validation service.
	*/
  constructor() { }
  
   /** 
  * Validates the number of seats of the car. The number of seats must be
  * an integer between 1 and 6 inclusive. We can assume this means a 7 seat
  * vehicle minus the driver.
  * @function
  * @returns {boolean}
  */
  validateSeats(seats: number) {
    return seats > 0 && seats <= 6 && seats % 1 === 0;
  }


  /**
   * Checks for special characters in the username and validates the length.
   * Usernames cannot be longer than 12 characters, less than 3 characters, or
   * contain special characters.
  */
  validateUserName(userName: string) {
		return /^\w+\.?\w+$/.test(userName) && userName.length >= 3 && userName.length <= 12;
	}

  /**
	 * This function is validates the length of the name and checks if there is any numeric values in the name string.
	 * First and last names cannot be longer than 29 characters.
	 */
	validateName(name: string) {
		return /^[a-zA-Z\u00C0-\u017F]+[- ]?[a-zA-Z\u00C0-\u017F]+$/.test(name) && name.length < 30;
	}

  /**
	 * Checks the email that the user entered.
	 * Emails must be formatted like one.
	 */
	validateEmail(email: string) {
		return /^\w+\.?\w+@\w+\.[a-zA-Z]{2,4}$/.test(email);
	}

  /**
	 * Validates the phone number.
	 * Phone numbers must be formatted like one.
	 */
	validatePhone(phone: string) {
		return /^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(phone);
  }
  
  /**
	 * This function formats the name string automatically, capitalizing any letters
	 * following spaces or hyphens.
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
	 * This function formats the phone number, automatically adding the hyphens.
	 */
	phoneFormat(phone: string) {
		return phone.replace(/[^0-9]/g, '').replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
	}


	//explore putting this function in a closure to prevent callers from needing to wrap it in their own asynchronous function

	validateAddress(address: Address) {
		let url = "https://secure.shippingapis.com/ShippingAPI.dll?API=Verify&XML=";
    	//probably need to hide this API userID--->____________
		let xml = `<AddressValidateRequest USERID="605REVAT4789"><Revision>1</Revision><Address ID="0"><Address1>${address.apt}</Address1><Address2>${address.street}</Address2><City>${address.city}</City><State>${address.state}</State><Zip5>${address.zip}</Zip5><Zip4/></Address></AddressValidateRequest>`;
		let returnedAddress = new Address("", "", "", "", "");

		return fetch(url + xml)
        .then(response => {
          return response.text();
		})
		.then(text => {
			//Parse the string returned into an XML document
			let parser = new DOMParser();
			let xmlDoc = parser.parseFromString(text, 'text/xml');
			
			let dpvConfirmation = xmlDoc.getElementsByTagName("DPVConfirmation");
			let errorDescription = xmlDoc.getElementsByTagName("Description");
			
			
			if (dpvConfirmation.length != 0) {
				console.log("dpvConfirmation: ", dpvConfirmation.item(0).textContent);
				switch(dpvConfirmation.item(0).textContent) {
					//Information on DPV Codes can be found here: https://www.accuzip.com/webhelp/Appendix/DPV_Codes_and_Information.htm
					case "Y":
						//"Y = Address was DPV confirmed for both primary and (if present) secondary numbers."
						//We submit the address that usps has returned in the xml doc as the zip code or state may have been corrected automatically
						console.log("before if statement", address);
						if (address.apt == "") {
							returnedAddress.apt = "";
						} else {
							console.log("address.apt == " + address.apt);
							returnedAddress.apt = xmlDoc.getElementsByTagName("Address1").item(0).textContent;
						}
						returnedAddress.street = xmlDoc.getElementsByTagName("Address2").item(0).textContent;
						returnedAddress.city = xmlDoc.getElementsByTagName("City").item(0).textContent;
						returnedAddress.state = xmlDoc.getElementsByTagName("State").item(0).textContent;
						returnedAddress.zip = xmlDoc.getElementsByTagName("Zip5").item(0).textContent;

						if (returnedAddress.state != address.state || returnedAddress.zip != address.zip || returnedAddress.city != address.city.toLocaleUpperCase() || returnedAddress.apt != address.apt.toLocaleUpperCase()) {
							if (confirm(`We found this address for you. Continue or make a change?` + `\n\n${returnedAddress.street}, ${returnedAddress.apt}\n${returnedAddress.city}, ${returnedAddress.state} ${returnedAddress.zip}`).valueOf()) {
								console.log("returnedAddress: ", returnedAddress)
								console.log("returned address: ", returnedAddress)
								return returnedAddress;
	
							} else {
								return null;
							}
						}

						return returnedAddress;
			
					case "D":
						//"D = Address was DPV confirmed for the primary number only, and Secondary number information was missing."
						//meaning we need the user to input their secondary address information (display ReturnText tag)
						alert(xmlDoc.getElementsByTagName("ReturnText").item(0).textContent);
						return null;

					case "S":
						//"S = Address was DPV confirmed for the primary number only, and Secondary number information was present but unconfirmed."
						//this means the user needs to correct the secondary address (display ReturnText tag)... but the primary address is technically deliverable.
						returnedAddress.apt = "";
						returnedAddress.street = xmlDoc.getElementsByTagName("Address2").item(0).textContent;
						returnedAddress.city = xmlDoc.getElementsByTagName("City").item(0).textContent;
						returnedAddress.state = xmlDoc.getElementsByTagName("State").item(0).textContent;
						returnedAddress.zip = xmlDoc.getElementsByTagName("Zip5").item(0).textContent;

						if (confirm(`We weren't able to find your Apt/Suite number. Would you like to continue with this address or make a change?` + `\n\n${returnedAddress.street},\n${returnedAddress.city}, ${returnedAddress.state} ${returnedAddress.zip}`).valueOf()) {
							console.log("returnedAddress: ", returnedAddress)
							return returnedAddress;

						} else {
							return null;
						}

					case "N":
						//"N = Both Primary and (if present) Secondary number information failed to DPV Confirm."
						//We will actually not get a DPVConfimation tag in this case. We will instead get an Error tag.
						//This case will never be reached
						break;
					case "BLANK":
						//"Blank = Address not presented to hash table."
						//The Blank code is sent back to us in an Error xml tag. This case is handled in the same place as case "N"
						//This case will never be reached
						break;
				}
			} else if (errorDescription.length != 0) {
				//"N = Both Primary and (if present) Secondary number information failed to DPV Confirm."
				//"Blank = Address not presented to hash table."
				//this is technically case "N" and "Blank", and we need to have the user input a different address (display Description tag)
				console.log("errorDescription: ", errorDescription.item(0).textContent);
				alert(errorDescription.item(0).textContent);
				return null;
			}
		})
	}
	
	capitalizeFirstLetter(s): String {
		if (typeof s !== 'string') return null;
		return s.charAt(0).toUpperCase() + s.slice(1)
	}
  
}
